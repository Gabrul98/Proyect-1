"""Fase 6: renderiza dossier/dossier.md y dossier/matriz_riesgo.md desde empresas.json."""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from config import DATA_DIR, DOSSIER_DIR, NA
from lib import today

CAPTURA = today()


def _ciiu(e):
    pri = e["actividad_ciiu"]["principal"]
    sec = e["actividad_ciiu"]["secundarias"]
    s = f"**Principal:** {pri}"
    if sec:
        s += "  \n**Secundarias:** " + "; ".join(sec)
    return s


def render_company(e):
    L = []
    L.append(f"### {e['razon_social']}")
    L.append("")
    L.append(f"- **RUC:** {e['ruc']}")
    L.append(f"- **Nombre comercial:** {e['nombre_comercial']}")
    L.append(f"- **Tipo de contribuyente:** {e['tipo_contribuyente']}")
    L.append(f"- **Estado del RUC:** {e['estado_ruc']}")
    L.append(f"- **Condición de domicilio:** {e['condicion_domicilio']}")
    L.append(f"- **Fecha de inscripción:** {e['fecha_inscripcion']}")
    L.append(f"- **Inicio de actividades:** {e['inicio_actividades']}")
    L.append(f"- **Régimen tributario:** {e['regimen_tributario']}")
    L.append(f"- **Trabajadores (estimado público):** {e['trabajadores_estimados']}")
    L.append("")
    L.append("**Actividad económica (CIIU)**  ")
    L.append(_ciiu(e))
    L.append("")
    d = e["domicilio_fiscal"]
    L.append("**Domicilio fiscal**  ")
    L.append(f"{d['direccion']}  ")
    L.append(f"Distrito: {d['distrito']} · Provincia: {d['provincia']} · Departamento: {d['departamento']} · Ubigeo: {d['ubigeo']}")
    L.append("")
    L.append("**Establecimientos anexos:** " + (", ".join(e["establecimientos_anexos"]) if e["establecimientos_anexos"] else e.get("_establecimientos_anexos_nota", NA)))
    L.append("")
    L.append("**Gobernanza / Representantes**")
    L.append("")
    L.append("| Nombre | DNI | Cargo | Vigencia |")
    L.append("|---|---|---|---|")
    for r in e["representantes"]:
        L.append(f"| {r['nombre']} | {r['dni']} | {r['cargo']} | {r['vigencia']} |")
    L.append("")
    L.append("**Vínculos**")
    if e["empresas_vinculadas"]:
        for v in e["empresas_vinculadas"]:
            if "razon_social" in v:
                L.append(f"- {v['razon_social']} (RUC {v['ruc']}) — {v['tipo_vinculo']}: {v.get('detalle','')}")
            else:
                L.append(f"- {v['nombre']} (DNI {v['dni']}) — {v['tipo_vinculo']}")
    else:
        L.append("- Sin vínculos por representante común detectados en fuentes públicas (ver sección de grupo).")
    L.append("")
    rp = e["riesgo_publico"]
    L.append("**Riesgo público**")
    L.append(f"- No habido: {'SÍ' if rp['no_habido'] else 'No'}")
    L.append(f"- Deuda en cobranza coactiva: {rp['deuda_coactiva']}")
    if rp["procesos_judiciales"]:
        for p in rp["procesos_judiciales"]:
            L.append(f"- **{p['tipo']}** ({p['fecha_hecho']}): {p['detalle']}")
            L.append(f"  - Estado: {p['estado']}")
            L.append(f"  - Fuentes: " + " · ".join(p["fuentes"][:3]))
    else:
        L.append("- Procesos judiciales: no se hallaron en fuentes públicas abiertas (CEJ-Poder Judicial requiere acceso/captcha).")
    if rp.get("sanciones_otras"):
        for s in rp["sanciones_otras"]:
            L.append(f"- **Sanción ({s['entidad']}):** {s['tipo']} — {s['motivo']} ({s['fecha']}). Fuente: {s['fuente']}")
    L.append(f"- Sanciones INDECOPI: {rp.get('_nota_indecopi', NA)}")
    L.append(f"- Protestos: {rp['protestos']}")
    L.append("")
    L.append("**Contratación estatal (OSCE/SEACE)**  ")
    L.append(e.get("_contratacion_nota", NA))
    L.append("")
    h = e["huella_digital"]
    L.append("**Huella digital y reputación**")
    L.append(f"- Web: {h['web']}")
    L.append(f"- Redes: " + ("; ".join(h["redes"]) if h["redes"] else NA))
    L.append(f"- Google rating: {h['google_rating']}")
    L.append(f"- Google reseñas: {h['google_resenas']}")
    L.append(f"- Ranking datosperu: {e.get('ranking_datosperu', NA)}")
    L.append("")
    L.append("**Fuentes**")
    for f in e["fuentes"]:
        L.append(f"- {f['dato']} — _{f['fuente']}_ ({f['fecha_captura']})")
    L.append("")
    L.append("---")
    L.append("")
    return "\n".join(L)


def render_dossier(d):
    L = []
    L.append("# Dossier de Due Diligence — Grupo empresarial (Arequipa, Perú)")
    L.append("")
    L.append(f"**Fecha de captura:** {d['_meta']['fecha_captura']}  ")
    L.append(f"**Fuentes primarias:** {', '.join(d['_meta']['fuentes_primarias'])}")
    L.append("")
    L.append("> ⚠️ **Descargo:** " + d["_meta"]["descargo"])
    L.append("")
    L.append("> **Limitación de fuente:** " + d["_meta"]["limitaciones"])
    L.append("")
    L.append("## Resumen ejecutivo")
    L.append("")
    L.append("Se investigaron 4 empresas peruanas vinculadas y 1 persona nexo. Las tres "
             "**E.I.R.L.** (Medestetic, Fenixzone, Inversiones Zevallos Rodriguez) están "
             "**ACTIVAS y HABIDAS**, domiciliadas en Arequipa y comparten a la misma "
             "**titular-gerente: KATIA GLORIA DELGADO CHIRINOS (DNI 41055232)**. La cuarta, "
             "el estudio jurídico **DELGADO & COILA /ATTORNEY AT LAW S.A.C.**, figura en "
             "**BAJA DE OFICIO** ante SUNAT. El hallazgo de mayor materialidad es la cobertura "
             "de prensa (abril 2025) sobre la **muerte de una paciente tras una cirugía en "
             "Medestetic**, local **clausurado y multado por la Municipalidad de Yanahuara por "
             "operar sin licencia para cirugías**, con **investigación fiscal por homicidio "
             "culposo** en curso contra el cirujano y su equipo.")
    L.append("")
    L.append("## Fichas por empresa")
    L.append("")
    for e in d["empresas"]:
        L.append(render_company(e))

    # Persona nexo
    n = d["nexo"]
    L.append("## Persona nexo")
    L.append("")
    L.append(f"### {n['nombre']} (DNI {n['dni']})")
    L.append(f"- **Rol:** {n['rol']}")
    L.append(f"- **Perfil:** {n['perfil']}")
    L.append("")
    L.append("| RUC | Razón social | Cargo |")
    L.append("|---|---|---|")
    for x in n["empresas_donde_figura"]:
        L.append(f"| {x['ruc']} | {x['razon_social']} | {x['cargo']} |")
    L.append("")
    L.append("**Fuentes:** " + " · ".join(f"{f['fuente']}" for f in n["fuentes"]))
    L.append("")

    # Grafo de vínculos
    L.append("## Grupo: grafo de vínculos")
    L.append("")
    L.append("```mermaid")
    L.append("graph TD")
    L.append('  KATIA["Katia Gloria Delgado Chirinos<br/>DNI 41055232 (nexo)"]')
    ids = {"20606589051": "MED", "20606592176": "FNX", "20608634241": "IZR", "20539523644": "DYC"}
    labels = {
        "20606589051": "Medestetic E.I.R.L.<br/>20606589051 · ACTIVO",
        "20606592176": "Fenixzone E.I.R.L.<br/>20606592176 · ACTIVO",
        "20608634241": "Inv. Zevallos Rodriguez E.I.R.L.<br/>20608634241 · ACTIVO",
        "20539523644": "Delgado & Coila /Attorney at Law S.A.C.<br/>20539523644 · BAJA DE OFICIO",
    }
    for ruc, nid in ids.items():
        L.append(f'  {nid}["{labels[ruc]}"]')
    L.append("  KATIA -->|titular-gerente| MED")
    L.append("  KATIA -->|titular-gerente| FNX")
    L.append("  KATIA -->|titular-gerente| IZR")
    L.append("  KATIA -.->|vínculo por apellido / estudio| DYC")
    L.append("```")
    L.append("")
    L.append("**Naturaleza del vínculo:** las 3 E.I.R.L. comparten **titular-gerente única** "
             "(Katia Gloria Delgado Chirinos), confirmada en datosperu para cada RUC; la persona "
             "figura como titular de **3 empresas**. El estudio jurídico S.A.C. se vincula por "
             "el **apellido Delgado** y por ser la actividad profesional de la nexo (abogada), "
             "pero su rol societario exacto **no está confirmado en fuentes públicas abiertas** "
             "(la ficha de representantes de SUNAT requiere acceso). Medestetic e Inversiones "
             "Zevallos Rodriguez comparten además **distrito (Yanahuara)**.")
    L.append("")
    L.append("## Nota metodológica y trazabilidad")
    L.append("")
    L.append("- Todos los crudos (JSON de API y HTML de perfiles/prensa) están en `/raw`.")
    L.append("- SUNAT e-consultaruc bloquea el scraping automatizado por WAF; se usó la API "
             "espejo del padrón SUNAT (apis.net.pe) + datosperu.org como equivalentes públicos.")
    L.append("- Campos sin fuente pública verificable se marcan **\"no disponible públicamente\"**; "
             "los que exigen autenticación/captcha se marcan **\"requiere acceso\"**.")
    L.append("- Datos personales: se limita a registro público mercantil (cargo, vigencia, DNI ya "
             "presente en padrones electorales/empresariales públicos).")
    return "\n".join(L)


SEM = {"verde": "🟢 Verde", "ambar": "🟡 Ámbar", "rojo": "🔴 Rojo"}


def assess(e, group=None):
    """Asigna semáforo con la señal pública que lo justifica."""
    señales = []
    nivel = "verde"
    if e["estado_ruc"].upper() != "ACTIVO":
        nivel = "rojo"
        señales.append(f"Estado RUC: **{e['estado_ruc']}**")
    if e["riesgo_publico"]["no_habido"]:
        nivel = "rojo"
        señales.append("Condición **NO HABIDO**")
    if e["riesgo_publico"]["procesos_judiciales"]:
        nivel = "rojo"
        señales.append("Investigación fiscal / proceso reportado por prensa (homicidio culposo)")
    if e["riesgo_publico"].get("sanciones_otras"):
        if nivel != "rojo":
            nivel = "ambar"
        señales.append("Sanción municipal (clausura + multa)")

    # Riesgo por asociación: comparte nexo/titular con una empresa marcada en rojo
    if nivel != "rojo" and group:
        red_rucs = {x["ruc"] for x in group
                    if x["ruc"] != e["ruc"] and x["riesgo_publico"]["procesos_judiciales"]}
        linked = {v.get("ruc") for v in e["empresas_vinculadas"] if v.get("ruc")}
        if red_rucs & linked:
            nivel = "ambar"
            señales.append("Riesgo reputacional por asociación (titular-gerente común con Medestetic)")

    # antigüedad / tamaño
    if e["estado_ruc"].upper() == "ACTIVO":
        if any(y in e["inicio_actividades"] for y in ("2020", "2021", "2022")):
            if nivel == "verde":
                nivel = "ambar"
            señales.append("Constitución reciente (2020-2022) y tamaño pequeño (poca trayectoria pública)")
    if not señales:
        señales.append("Activa, habida, sin señales públicas adversas detectadas")
    return nivel, señales


def render_matriz(d):
    L = []
    L.append("# Matriz de riesgo — Grupo empresarial (Arequipa, Perú)")
    L.append("")
    L.append(f"**Fecha de captura:** {d['_meta']['fecha_captura']}")
    L.append("")
    L.append("> ⚠️ **Este semáforo NO reemplaza un reporte de central de riesgo** "
             "(Infocorp/Equifax, Sentinel) ni una verificación registral oficial "
             "(SUNAT/SUNARP). Es una lectura de señales públicas (OSINT) a la fecha indicada.")
    L.append("")
    L.append("| Empresa | RUC | Semáforo | Señales públicas que lo justifican |")
    L.append("|---|---|---|---|")
    for e in d["empresas"]:
        nivel, señales = assess(e, d["empresas"])
        L.append(f"| {e['razon_social']} | {e['ruc']} | {SEM[nivel]} | " + "; ".join(señales) + " |")
    L.append("")
    L.append("## Criterios del semáforo")
    L.append("")
    L.append("- 🔴 **Rojo:** RUC no activo (baja/suspensión), condición *no habido*, "
             "proceso judicial/investigación fiscal abierta, o sanción grave.")
    L.append("- 🟡 **Ámbar:** activa/habida pero con señales de atención: sanción administrativa "
             "menor, constitución muy reciente, tamaño mínimo o baja trazabilidad pública.")
    L.append("- 🟢 **Verde:** activa, habida, antigüedad razonable y sin señales públicas adversas.")
    L.append("")
    L.append("## Detalle de las señales rojas")
    L.append("")
    L.append("- **Corporación Médica Medestetic E.I.R.L. (20606589051):** RUC activo/habido, "
             "pero con **investigación fiscal por homicidio culposo** (muerte de paciente tras "
             "cirugía, abril 2025) y **clausura + multa de 1 UIT** por la Municipalidad de "
             "Yanahuara por operar cirugías **sin licencia**. Riesgo reputacional y legal alto.")
    L.append("- **Delgado & Coila /Attorney at Law S.A.C. (20539523644):** **BAJA DE OFICIO** "
             "ante SUNAT (RUC no operativo). No apto para contratar.")
    L.append("")
    L.append("## Nota sobre las E.I.R.L. vinculadas")
    L.append("")
    L.append("Fenixzone e Inversiones Zevallos Rodriguez están activas y habidas, sin señales "
             "adversas propias detectadas, pero comparten **titular-gerente** y entorno con "
             "Medestetic, por lo que heredan **riesgo reputacional por asociación**. Su "
             "constitución reciente (2020-2022) y tamaño pequeño (≤5 trabajadores) limitan su "
             "trayectoria verificable.")
    return "\n".join(L)


def main():
    os.makedirs(DOSSIER_DIR, exist_ok=True)
    d = json.load(open(os.path.join(DATA_DIR, "empresas.json"), encoding="utf-8"))
    with open(os.path.join(DOSSIER_DIR, "dossier.md"), "w", encoding="utf-8") as f:
        f.write(render_dossier(d))
    with open(os.path.join(DOSSIER_DIR, "matriz_riesgo.md"), "w", encoding="utf-8") as f:
        f.write(render_matriz(d))
    print("[Fase 6] dossier/dossier.md y dossier/matriz_riesgo.md generados.")


if __name__ == "__main__":
    main()
