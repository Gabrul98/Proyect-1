"""Fase 6: normaliza a empresas.json y genera dossier.md + matriz_riesgo.md."""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import COMPANIES, NEXO, DATA_DIR, DOSSIER_DIR, NA
from lib import save_json, today
import evidence_web as ev

CAPTURA = today()
SRC_SUNAT_API = "SUNAT (vía api.apis.net.pe/v1/ruc, espejo del padrón SUNAT)"
SRC_DP = "datosperu.org (perfil público de empresa)"


def src(dato, fuente, fecha=CAPTURA):
    return {"dato": dato, "fuente": fuente, "fecha_captura": fecha}


def build_entity(c, raw):
    api = raw.get("apisnet", {}) or {}
    dp = raw.get("datosperu", {}) or {}
    ruc = c["ruc"]
    web = ev.WEB_EVIDENCE.get(ruc, {})
    fuentes = []

    estado = dp.get("estado_ruc") or api.get("estado") or NA
    condicion = dp.get("condicion_domicilio") or api.get("condicion") or NA
    no_habido = "NO HABIDO" in (condicion or "").upper()

    # CIIU
    ciiu_pri = dp.get("ciiu_principal") or NA
    ciiu_sec = dp.get("ciiu_secundarias") or []

    # Domicilio
    direccion = dp.get("domicilio_direccion") or (api.get("direccion") or "").strip() or NA
    ubigeo = api.get("ubigeo") or NA
    depto = api.get("departamento") or NA
    prov = api.get("provincia") or NA
    dist = api.get("distrito") or NA

    # Representantes
    reps = []
    for r in dp.get("representantes", []):
        dni = NEXO["dni"] if r["nombre"].upper().startswith("DELGADO CHIRINOS KATIA") else NA
        reps.append({
            "nombre": r["nombre"],
            "dni": dni,
            "cargo": r["cargo"],
            "vigencia": f"desde {r['desde']}",
        })
    if not reps:
        reps = [{"nombre": NA, "dni": NA, "cargo": NA, "vigencia": NA}]

    # Riesgo público
    coactiva_flags = dp.get("coactiva_flags") or []
    if coactiva_flags:
        coactiva = ("Sin deuda coactiva > 1 UIT declarada en programas Reactiva/COVID "
                    f"(flags: {', '.join(coactiva_flags)}). Estado coactivo general SUNAT: "
                    "requiere acceso (consulta de deuda coactiva exige captcha en SUNAT).")
    else:
        coactiva = ("no disponible públicamente (consulta de deuda coactiva SUNAT requiere "
                    "acceso/captcha)")

    procesos = []
    sanciones = []
    for p in web.get("prensa_riesgo", []):
        procesos.append({
            "tipo": "Investigación fiscal / cobertura de prensa",
            "detalle": p["titular"] + " — " + p["resumen"],
            "estado": "Reportado por prensa; expediente formal en Poder Judicial (CEJ) requiere acceso (captcha).",
            "fecha_hecho": p.get("fecha_hecho", NA),
            "fuentes": p["fuentes"],
        })
    # Sanción municipal documentada por prensa (Medestetic)
    if ruc == "20606589051":
        sanciones.append({
            "entidad": "Municipalidad Distrital de Yanahuara",
            "tipo": "Clausura del local + multa 1 UIT (~S/ 5,350)",
            "motivo": "Realizar cirugías con licencia solo de consultorio médico (sin licencia para cirugías).",
            "fecha": "abril de 2025",
            "fuente": web["prensa_riesgo"][0]["fuentes"][0],
        })

    # Contratación estatal
    if dp.get("sin_contrataciones"):
        contratacion = []
        contratacion_nota = ("Sin contrataciones con el Estado registradas en el perfil "
                             "agregado de datosperu. Verificación directa en OSCE/SEACE-CONOSCE: "
                             "requiere acceso (portal bloquea acceso automatizado).")
    else:
        contratacion = []
        contratacion_nota = "no disponible públicamente (OSCE/SEACE requiere acceso)"

    # Huella digital
    redes = []
    for r in web.get("redes", []):
        redes.append(f"{r['red']}: {r['handle']} ({r['url']})")

    # Trabajadores
    trab = dp.get("trabajadores")
    if trab:
        trabajadores = f"{trab['nro_trabajadores']} (periodo {trab['periodo']}, fuente datosperu/SUNAT)"
    else:
        trabajadores = NA

    # Fuentes (trazabilidad)
    fuentes += [
        src("RUC, razón social, estado, condición, dirección, ubigeo, distrito/prov/depto", SRC_SUNAT_API),
        src("Tipo contribuyente, fechas inscripción/inicio, CIIU, comprobantes, representantes, trabajadores, coactiva", SRC_DP),
    ]
    for p in web.get("prensa_riesgo", []):
        fuentes.append(src("Riesgo reputacional/legal (prensa)", p["fuentes"][0]))

    entity = {
        "ruc": ruc,
        "razon_social": c["razon_social"],
        "nombre_comercial": web.get("nombre_comercial_publico", NA),
        "tipo_contribuyente": dp.get("tipo_contribuyente") or NA,
        "estado_ruc": estado,
        "condicion_domicilio": condicion,
        "fecha_inscripcion": dp.get("fecha_inscripcion") or NA,
        "inicio_actividades": dp.get("inicio_actividades") or NA,
        "regimen_tributario": NA,  # no expuesto por las fuentes libres usadas
        "actividad_ciiu": {"principal": ciiu_pri, "secundarias": ciiu_sec},
        "domicilio_fiscal": {
            "direccion": direccion, "ubigeo": ubigeo,
            "departamento": depto, "provincia": prov, "distrito": dist,
        },
        "establecimientos_anexos": [],  # ficha extendida SUNAT bloqueada (WAF) -> requiere acceso
        "_establecimientos_anexos_nota": ("requiere acceso: la ficha extendida de SUNAT "
                                          "(anexos) bloquea el acceso automatizado por WAF"),
        "representantes": reps,
        "empresas_vinculadas": [],  # se completa en build_links
        "riesgo_publico": {
            "no_habido": no_habido,
            "deuda_coactiva": coactiva,
            "procesos_judiciales": procesos,
            "sanciones_indecopi": [],  # ver nota
            "sanciones_otras": sanciones,
            "protestos": NA,  # Cámara de Comercio (CCL) requiere acceso de pago
            "_nota_indecopi": "Búsqueda en registro INDECOPI: requiere acceso (formulario con captcha).",
        },
        "contratacion_estatal": contratacion,
        "_contratacion_nota": contratacion_nota,
        "huella_digital": {
            "web": web.get("web_oficial", NA),
            "redes": redes,
            "google_rating": web.get("google_rating", NA),
            "google_resenas": web.get("google_resenas", NA),
        },
        "trabajadores_estimados": trabajadores,
        "ranking_datosperu": dp.get("ranking") or NA,
        "fuentes": fuentes,
    }
    return entity


def build_nexo():
    return {
        "tipo": "persona_natural (nexo del grupo)",
        "nombre": NEXO["nombre"],
        "dni": NEXO["dni"],
        "rol": NEXO["rol"],
        "perfil": ev.NEXO_EVIDENCE["perfil"],
        "empresas_donde_figura": [
            {"ruc": "20606589051", "razon_social": "CORPORACION MEDICA MEDESTETIC E.I.R.L.", "cargo": "TITULAR-GERENTE"},
            {"ruc": "20606592176", "razon_social": "FENIXZONE E.I.R.L", "cargo": "TITULAR-GERENTE"},
            {"ruc": "20608634241", "razon_social": "INVERSIONES ZEVALLOS RODRIGUEZ E.I.R.L.", "cargo": "TITULAR-GERENTE"},
            {"ruc": "20539523644", "razon_social": "DELGADO & COILA /ATTORNEY AT LAW S.A.C.",
             "cargo": "vínculo por apellido (estudio jurídico); rol societario no confirmado públicamente"},
        ],
        "fuentes": ev.NEXO_EVIDENCE["fuentes"],
    }


def build_links(entities, nexo):
    """Construye el grafo de vínculos entre las 4 empresas + persona nexo."""
    nexo_name = NEXO["nombre"]
    # ¿En qué empresas aparece la nexo como representante?
    for e in entities:
        vinc = []
        for other in entities:
            if other["ruc"] == e["ruc"]:
                continue
            # vínculo por representante común
            reps_e = {r["nombre"] for r in e["representantes"]}
            reps_o = {r["nombre"] for r in other["representantes"]}
            comunes = reps_e & reps_o - {NA}
            if comunes:
                vinc.append({
                    "ruc": other["ruc"],
                    "razon_social": other["razon_social"],
                    "tipo_vinculo": "representante en común",
                    "detalle": ", ".join(sorted(comunes)),
                })
        # vínculo con la nexo
        if any(r["nombre"] == nexo_name for r in e["representantes"]):
            vinc.append({
                "dni": NEXO["dni"], "nombre": nexo_name,
                "tipo_vinculo": "persona nexo (titular-gerente)",
            })
        e["empresas_vinculadas"] = vinc
    return entities


def main():
    raw = json.load(open(os.path.join(DATA_DIR, "_collected_raw.json"), encoding="utf-8"))
    raw_by_ruc = {r["ruc"]: r for r in raw["empresas"]}

    entities = [build_entity(c, raw_by_ruc[c["ruc"]]) for c in COMPANIES]
    nexo = build_nexo()
    entities = build_links(entities, nexo)

    out = {
        "_meta": {
            "proyecto": "Due diligence grupo empresarial (Arequipa, Perú)",
            "fecha_captura": CAPTURA,
            "fuentes_primarias": [SRC_SUNAT_API, SRC_DP, "búsqueda web pública (prensa, redes)"],
            "limitaciones": raw["_meta"]["sunat_nota"],
            "descargo": ("Documento de inteligencia de fuentes abiertas (OSINT). NO reemplaza "
                         "un reporte de central de riesgo (Infocorp/Sentinel) ni una verificación "
                         "registral en SUNARP/SUNAT."),
        },
        "empresas": entities,
        "nexo": nexo,
    }
    save_json(os.path.join(DATA_DIR, "empresas.json"), out)
    print("[Fase 6] data/empresas.json generado.")
    return out


if __name__ == "__main__":
    main()
