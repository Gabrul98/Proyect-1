"""Rastreo de EGRESOS de la caja: ¿a dónde sale el dinero?

Clasifica los asientos internos (NOMBRE='CLINICA' u otros no-paciente) por concepto,
y reconcilia ingresos de pacientes vs egresos. Objetivo: ver el destino del efectivo,
en especial lo que va hacia Katia (KTY/KATY) y los préstamos.
"""
import re
import json
import datetime as dt
import openpyxl

from audit_caja import extract, is_internal, monthkey  # reutiliza el extractor deduplicado

# Categorías por orden de prioridad (la primera que matchea gana)
CATS = [
    ("Préstamos (servicio/uso)", re.compile(r"PRESTAM|PRÉSTAM", re.I)),
    ("Retiro a KATIA (KTY/KATY)", re.compile(r"\b(KTY|KATY)\b", re.I)),
    ("Devoluciones a pacientes", re.compile(r"DEVOLUC|REEMBOLS", re.I)),
    ("Implantes (mamas/glúteos/Motiva)", re.compile(r"MOTIVA|MAMAS|MAMOPLAST|GLUTEO|IMPLANTE|PROTESIS|MENTOPLAST", re.I)),
    ("Equipo/Activo (piezotomo, etc.)", re.compile(r"PIEZOTOM|PIEZO|PIEDZOTOM|PIESOTOM|EQUIPO|LASER|MAQUINA", re.I)),
    ("Pagos a médicos (Dr.)", re.compile(r"\bDR\b|DOCTOR|\bMZ\b|DIAZ|ANESTESI|CIRUJAN", re.I)),
    ("Sueldos/Personal", re.compile(r"SUELDO|PLANILLA|PAGO\s+\w+|SALARIO|DANNY|HONORARIO", re.I)),
    ("Impuestos/Notaría/Legal", re.compile(r"IMPUEST|SUNAT|NOTAR|ABOGAD|MULTA|MUNICIP|TRIBUT", re.I)),
    ("Delivery/Alimentación", re.compile(r"RAPPI|DELIVERY|ALMUERZO|DESAYUNO|CENA|TAXI|MOVILIDAD|URBANO|SHALOM|PEDIDO", re.I)),
    ("Servicios/Local", re.compile(r"LUZ|AGUA|INTERNET|TELEFON|ALQUILER|RENTA|JARDIN|LIMPIEZA|MANTENIMIENTO|RESIDUOS|BIOCONTAMIN", re.I)),
    ("Materiales/Insumos", re.compile(r"MATERIAL|INSUMO|FARMACIA|MEDICAC|BOTOX|ACIDO|COLAGENO|HILO|IMPLANTE|PROTESIS|ANESTES", re.I)),
]


def categorize(text):
    for name, rx in CATS:
        if rx.search(text):
            return name
    return "Otros / sin clasificar"


def main():
    rows = extract()
    egresos = {}     # cat -> dict(monto, n)
    por_mes_cat = {}  # mk -> cat -> monto
    ingresos_pac = 0.0
    egresos_tot = 0.0
    detalle_otros = []
    katia_rows = []

    for r in rows:
        cobro = r["efe"] + r["pos"] + r["tra"] + r["dol"] + r["mat"]
        if is_internal(r):
            # egreso / movimiento interno
            text = (r["proc"] + " " + r["nombre"]).upper()
            cat = categorize(text)
            e = egresos.setdefault(cat, dict(monto=0.0, n=0))
            e["monto"] += cobro
            e["n"] += 1
            egresos_tot += cobro
            mk = monthkey(r["fecha"])
            por_mes_cat.setdefault(mk, {}).setdefault(cat, 0.0)
            por_mes_cat[mk][cat] += cobro
            if cat == "Otros / sin clasificar" and cobro > 0:
                detalle_otros.append((r["fecha"], r["proc"][:50], cobro))
            if re.search(r"\b(KTY|KATY)\b", text) and "PRESTAM" not in text:
                katia_rows.append((r["fecha"], r["proc"][:45], cobro))
        else:
            ingresos_pac += cobro if cobro else r["total"]

    print("=== INGRESOS vs EGRESOS de la CAJA (S/) ===")
    print(f"  Ingresos de pacientes (efe+pos+tra+dol+mat): {ingresos_pac:>14,.0f}")
    print(f"  Egresos / movimientos internos:              {egresos_tot:>14,.0f}")
    print(f"  Diferencia (ingreso - egreso de caja):       {ingresos_pac - egresos_tot:>14,.0f}")
    print("\n  NOTA: los desembolsos macro de BBVA (~S/76k mar-25 y ~S/107k jun-25)")
    print("        NO transitan por esta caja chica; entran a la cuenta bancaria.")

    print("\n=== EGRESOS POR CATEGORÍA (todo el periodo) ===")
    print(f"{'Categoría':32s} {'Monto S/':>12s} {'n':>5s}  {'% egresos':>9s}")
    for cat, e in sorted(egresos.items(), key=lambda x: -x[1]["monto"]):
        pct = 100 * e["monto"] / egresos_tot if egresos_tot else 0
        print(f"{cat:32s} {e['monto']:>12,.0f} {e['n']:>5d}  {pct:>8.1f}%")

    print("\n=== RETIROS A KATIA: meses con mayor monto ===")
    bymonth = {}
    for d, p, v in katia_rows:
        bymonth[monthkey(d)] = bymonth.get(monthkey(d), 0.0) + v
    for mk in sorted(bymonth, key=lambda k: -bymonth[k])[:6]:
        print(f"  {mk}: S/ {bymonth[mk]:,.0f}")
    big = sorted(katia_rows, key=lambda x: -x[2])[:12]
    print("  Mayores asientos individuales a KTY/KATY:")
    for d, p, v in big:
        print(f"    {d}  S/{v:>8,.0f}  {p!r}")

    print("\n=== 'Otros / sin clasificar' mayores (revisar manualmente) ===")
    for d, p, v in sorted(detalle_otros, key=lambda x: -x[2])[:15]:
        print(f"    {d}  S/{v:>8,.0f}  {p!r}")

    out = {
        "ingresos_pacientes": round(ingresos_pac, 2),
        "egresos_internos": round(egresos_tot, 2),
        "por_categoria": {k: {"monto": round(v["monto"], 2), "n": v["n"]}
                          for k, v in egresos.items()},
        "retiros_katia_por_mes": {k: round(v, 2) for k, v in bymonth.items()},
    }
    with open("audit/analisis_egresos.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2)
    print("\n[OK] audit/analisis_egresos.json escrito.")


if __name__ == "__main__":
    main()
