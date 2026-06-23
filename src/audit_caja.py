"""Análisis forense de la caja diaria (CAJA_2025_2026.xlsx).

Cruza la caja con la línea de tiempo del caso (fallecimiento abr-2025) y con
los reportes de central de riesgo (Sentinel) de Medestetic y de Katia.

Salidas:
- Cobertura y huecos (periodos sin caja) dentro del rango operativo real.
- Ingresos de pacientes por mes (excluye movimientos internos 'CLINICA').
- Retiros a nombre de KTY/KATY y entradas/registros 'PRESTAMO' por mes.
- audit/analisis_caja.json con el detalle.
"""
import re
import json
import datetime as dt
import openpyxl
from openpyxl.utils import get_column_letter

XLSX = "audit/in/CAJA_2025_2026.xlsx"
WIN_START = dt.date(2025, 1, 1)
WIN_END = dt.date(2026, 3, 31)

MONTH_ORDER = [
    "ENERO 2025", "FEBRERO 2025", "MARZO 2025", "ABRIL 2025", "MAYO 2025",
    "JUNIO ", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIENBRE",
    "DICIEMBRE", "ENERO 2026 ", "FEBRERO 2O26", "MARZO 2026",
]
SHEET_YEAR = {s: 2025 for s in ["JUNIO ", "JULIO", "AGOSTO", "SEPTIEMBRE",
                                 "OCTUBRE", "NOVIENBRE", "DICIEMBRE"]}


def parse_date(v):
    if v is None:
        return None
    if isinstance(v, dt.datetime):
        return v.date()
    if isinstance(v, dt.date):
        return v
    s = str(v).strip()
    m = re.match(r"^(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{2,4})$", s)
    if m:
        d, mo, y = map(int, m.groups())
        if y < 100:
            y += 2000
        try:
            return dt.date(y, mo, d)
        except ValueError:
            return None
    return None


def num(v):
    if v is None:
        return 0.0
    if isinstance(v, (int, float)):
        return float(v)
    s = re.sub(r"[^\d.\-]", "", str(v))
    try:
        return float(s) if s not in ("", "-", ".") else 0.0
    except ValueError:
        return 0.0


def header_map(ws):
    for r in range(1, 12):
        rv = {}
        found = False
        for c in range(1, ws.max_column + 1):
            h = (str(ws.cell(r, c).value).strip().upper() if ws.cell(r, c).value else "")
            rv[h] = c
            if h == "FECHA":
                found = True
        if found:
            return r, rv
    return None, {}


def colof(cm, *names):
    for n in names:
        for h, c in cm.items():
            if h.startswith(n):
                return c
    return None


def extract():
    wb = openpyxl.load_workbook(XLSX, data_only=True)
    seen = set()
    rows = []
    for title in MONTH_ORDER:
        if title not in wb.sheetnames:
            continue
        ws = wb[title]
        hr, cm = header_map(ws)
        if hr is None:
            continue
        cF = cm.get("FECHA")
        cTot = colof(cm, "MNT TOTAL", "MONTO TOTAL")
        cNom = colof(cm, "NOMBRE")
        cProc = colof(cm, "PROCEDIMIENTO")
        cEfe = colof(cm, "EFECTIVO")
        cPos = colof(cm, "POS")
        cTra = colof(cm, "TRANS")
        cDol = colof(cm, "DOLARES")
        cMat = colof(cm, "MONTO MAT", "MNT MAT", "MONTO MATE")
        for r in range(hr + 1, ws.max_row + 1):
            d = parse_date(ws.cell(r, cF).value) if cF else None
            if not d or not (WIN_START <= d <= WIN_END):
                continue
            nom = (str(ws.cell(r, cNom).value).strip() if cNom and ws.cell(r, cNom).value else "")
            proc = (str(ws.cell(r, cProc).value).strip() if cProc and ws.cell(r, cProc).value else "")
            rec = dict(
                fecha=d, nombre=nom, proc=proc,
                total=num(ws.cell(r, cTot).value) if cTot else 0.0,
                efe=num(ws.cell(r, cEfe).value) if cEfe else 0.0,
                pos=num(ws.cell(r, cPos).value) if cPos else 0.0,
                tra=num(ws.cell(r, cTra).value) if cTra else 0.0,
                dol=num(ws.cell(r, cDol).value) if cDol else 0.0,
                mat=num(ws.cell(r, cMat).value) if cMat else 0.0,
            )
            key = (d, nom.upper(), proc.upper(), rec["total"], rec["efe"],
                   rec["pos"], rec["tra"], rec["mat"])
            if key in seen:
                continue
            seen.add(key)
            rows.append(rec)
    return rows


def is_internal(rec):
    return rec["nombre"].strip().upper().startswith("CLINICA")


RX_KATY = re.compile(r"\b(KTY|KATY)\b", re.I)
RX_PREST = re.compile(r"PRESTAM|PRÉSTAM", re.I)
RX_DEVOL = re.compile(r"DEVOLUC|REEMBOLS", re.I)


def monthkey(d):
    return f"{d.year}-{d.month:02d}"


def analyze(rows):
    months = {}
    for rec in rows:
        mk = monthkey(rec["fecha"])
        m = months.setdefault(mk, dict(
            dias=set(), ingreso_pac=0.0, regs_pac=0,
            retiros_katy=0.0, n_katy=0,
            prestamos=0.0, n_prestamo=0,
            devoluciones=0.0, n_devol=0,
        ))
        m["dias"].add(rec["fecha"])
        cobro = rec["efe"] + rec["pos"] + rec["tra"] + rec["dol"] + rec["mat"]
        blob = (rec["proc"] + " " + rec["nombre"]).upper()
        if is_internal(rec):
            if RX_PREST.search(blob):
                m["prestamos"] += cobro
                m["n_prestamo"] += 1
            elif RX_DEVOL.search(blob):
                m["devoluciones"] += cobro
                m["n_devol"] += 1
            elif RX_KATY.search(blob):
                m["retiros_katy"] += cobro
                m["n_katy"] += 1
        else:
            # Ingreso de paciente
            m["ingreso_pac"] += cobro if cobro else rec["total"]
            m["regs_pac"] += 1
            if RX_KATY.search(blob):  # pagos "YAPE KTY" de pacientes (informalidad)
                pass
    return months


def gaps(rows, min_gap=3):
    days = sorted({r["fecha"] for r in rows})
    if not days:
        return [], None, None
    present = set(days)
    out = []
    d = days[0]
    run = []
    one = dt.timedelta(days=1)
    while d <= days[-1]:
        if d not in present:
            run.append(d)
        else:
            if len(run) >= min_gap:
                out.append((run[0], run[-1], len(run)))
            run = []
        d += one
    if len(run) >= min_gap:
        out.append((run[0], run[-1], len(run)))
    return out, days[0], days[-1]


if __name__ == "__main__":
    rows = extract()
    months = analyze(rows)
    g, start, end = gaps(rows, 3)

    print(f"Rango operativo (deduplicado): {start} .. {end}  | filas: {len(rows)}")
    print("\n=== HUECOS (>=3 días consecutivos sin caja) ===")
    for a, b, n in g:
        marca = "  <== POST-FALLECIMIENTO/CLAUSURA" if (a <= dt.date(2025, 4, 20) and b >= dt.date(2025, 4, 10)) else ""
        print(f"  {a} -> {b}  ({n} días){marca}")

    print("\n=== RESUMEN MENSUAL ===")
    print(f"{'Mes':8s} {'dias':>4s} {'regPac':>6s} {'INGRESO_PAC':>12s} "
          f"{'RETIRO_KTY':>11s}({'n':>3s}) {'PRESTAMOS':>10s}({'n':>2s}) {'DEVOL':>7s}")
    tot = dict(ing=0, kty=0, pres=0, dev=0)
    for mk in sorted(months):
        m = months[mk]
        tot["ing"] += m["ingreso_pac"]; tot["kty"] += m["retiros_katy"]
        tot["pres"] += m["prestamos"]; tot["dev"] += m["devoluciones"]
        print(f"{mk:8s} {len(m['dias']):>4d} {m['regs_pac']:>6d} "
              f"{m['ingreso_pac']:>12,.0f} {m['retiros_katy']:>11,.0f}({m['n_katy']:>3d}) "
              f"{m['prestamos']:>10,.0f}({m['n_prestamo']:>2d}) {m['devoluciones']:>7,.0f}")
    print(f"{'TOTAL':8s} {'':>4s} {'':>6s} {tot['ing']:>12,.0f} {tot['kty']:>11,.0f} "
          f"{'':>4s}  {tot['pres']:>10,.0f}     {tot['dev']:>7,.0f}")

    # Volcado JSON
    out = {
        "rango": {"inicio": str(start), "fin": str(end), "filas": len(rows)},
        "huecos": [{"desde": str(a), "hasta": str(b), "dias": n} for a, b, n in g],
        "meses": {mk: {**{k: (round(v, 2) if isinstance(v, float) else
                           (len(v) if isinstance(v, set) else v))
                          for k, v in m.items()}} for mk, m in months.items()},
        "totales": {k: round(v, 2) for k, v in tot.items()},
    }
    with open("audit/analisis_caja.json", "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=2, default=str)
    print("\n[OK] audit/analisis_caja.json escrito.")
