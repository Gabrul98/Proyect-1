"""Genera el Dossier de Irregularidades en PDF (descargable).

Consolida hallazgos públicos (regulatorios/legales) + financieros (auditoría
de caja x central de riesgo). Lee los JSON de análisis para las cifras.
"""
import json
import datetime as dt
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, ListFlowable, ListItem)
from reportlab.lib.enums import TA_JUSTIFY, TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# Fuente Unicode (acentos, símbolos, bullets)
_FD = "/usr/share/fonts/truetype/dejavu"
pdfmetrics.registerFont(TTFont("DV", f"{_FD}/DejaVuSans.ttf"))
pdfmetrics.registerFont(TTFont("DV-Bold", f"{_FD}/DejaVuSans-Bold.ttf"))
pdfmetrics.registerFontFamily("DV", normal="DV", bold="DV-Bold",
                              italic="DV", boldItalic="DV-Bold")

CAJA = json.load(open("audit/analisis_caja.json", encoding="utf-8"))
EGR = json.load(open("audit/analisis_egresos.json", encoding="utf-8"))
OUT = "audit/Dossier_Irregularidades_Medestetic.pdf"

# ---------- estilos ----------
ss = getSampleStyleSheet()
H1 = ParagraphStyle("H1", parent=ss["Heading1"], fontName="DV-Bold", fontSize=15,
                    spaceAfter=6, textColor=colors.HexColor("#1a1a2e"))
H2 = ParagraphStyle("H2", parent=ss["Heading2"], fontName="DV-Bold", fontSize=12,
                    spaceBefore=10, spaceAfter=4, textColor=colors.HexColor("#16213e"))
BODY = ParagraphStyle("Body", parent=ss["BodyText"], fontName="DV", fontSize=9.3,
                      leading=13, alignment=TA_JUSTIFY, spaceAfter=4)
SMALL = ParagraphStyle("Small", parent=ss["BodyText"], fontName="DV", fontSize=7.6,
                       leading=9.5, textColor=colors.HexColor("#555555"))
TITLE = ParagraphStyle("Title", parent=ss["Title"], fontName="DV-Bold", fontSize=20,
                       leading=24, textColor=colors.HexColor("#0f3460"), alignment=TA_CENTER)
SUB = ParagraphStyle("Sub", parent=ss["Normal"], fontName="DV", fontSize=10,
                     alignment=TA_CENTER, textColor=colors.HexColor("#444444"))
CELL = ParagraphStyle("Cell", parent=ss["BodyText"], fontName="DV", fontSize=8.3, leading=10.5)
CELLB = ParagraphStyle("CellB", parent=CELL, fontName="DV-Bold")

story = []


def P(t, st=BODY):
    story.append(Paragraph(t, st))


def gap(h=4):
    story.append(Spacer(1, h))


def rule():
    story.append(HRFlowable(width="100%", thickness=0.7,
                            color=colors.HexColor("#cccccc"), spaceBefore=4, spaceAfter=6))


def bullets(items):
    story.append(ListFlowable(
        [ListItem(Paragraph(x, BODY), leftIndent=6, value="•") for x in items],
        bulletType="bullet", start="•", leftIndent=10,
        bulletFontName="DV", bulletFontSize=9))


def sev_table(rows, head):
    data = [[Paragraph(h, CELLB) for h in head]]
    styles = [
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f3460")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f3f4f8")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 4), ("RIGHTPADDING", (0, 0), (-1, -1), 4),
        ("TOPPADDING", (0, 0), (-1, -1), 3), ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
    ]
    sevcolor = {"ALTA": "#c0392b", "MEDIA": "#d68910", "BAJA": "#2e7d32",
                "ROJO": "#c0392b", "AMBAR": "#d68910", "VERDE": "#2e7d32"}
    for i, r in enumerate(rows, start=1):
        cells = [Paragraph(str(c), CELL) for c in r]
        data.append(cells)
        sv = str(r[-1]).upper().strip()
        if sv in sevcolor:
            styles.append(("BACKGROUND", (len(r) - 1, i), (len(r) - 1, i),
                           colors.HexColor(sevcolor[sv])))
            styles.append(("TEXTCOLOR", (len(r) - 1, i), (len(r) - 1, i), colors.white))
    return data, styles


# ===================== PORTADA =====================
P("DOSSIER DE IRREGULARIDADES", TITLE)
gap(2)
P("Corporación Médica Medestetic E.I.R.L. (RUC 20606589051)", SUB)
P("&laquo;Bodytite Arequipa&raquo; — Yanahuara, Arequipa", SUB)
gap(8)
hoy = dt.date.today().strftime("%d/%m/%Y")
meta = [
    ["Titular en papeles", "Katia Gloria Delgado Chirinos (DNI 41055232)"],
    ["Dueño económico declarado", "Dr. Marco Antonio Zegarra (DNI 29656427)"],
    ["Solicitante de la revisión", "Dr. Marco Antonio Zegarra (socio)"],
    ["Periodo analizado (caja)", "03/01/2025 – 14/03/2026"],
    ["Fecha de emisión", hoy],
    ["Naturaleza", "Revisión OSINT + auditoría interna de indicios (no pericial)"],
]
t = Table(meta, colWidths=[55 * mm, 110 * mm])
t.setStyle(TableStyle([
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#cccccc")),
    ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#eef0f5")),
    ("FONTNAME", (0, 0), (-1, -1), "DV"),
    ("FONTNAME", (0, 0), (0, -1), "DV-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 9), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ("LEFTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 4),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
]))
story.append(t)
gap(8)
P("<b>Advertencia.</b> Este dossier consolida (i) información de fuentes públicas y (ii) un "
  "análisis de archivos internos aportados por el solicitante (caja contable y reportes de central "
  "de riesgo). Las cifras de caja provienen de un registro manual con informalidades. Los hallazgos "
  "son <b>indicios</b> para sustentar una revisión contable/legal formal; <b>no constituyen un "
  "dictamen pericial ni una imputación</b>. Contiene datos personales: uso restringido del titular.", SMALL)
rule()

# ===================== 1. RESUMEN =====================
P("1. Resumen de irregularidades", H1)
P("La revisión identifica dos bloques de irregularidades: <b>(A) regulatorias y legales</b> "
  "(operación quirúrgica sin licencia, fallecimiento de paciente e investigación fiscal, clausura "
  "municipal, y una empresa vinculada con RUC dado de baja) y <b>(B) financieras</b> "
  "(endeudamiento bancario y personal no informado al socio, salida de efectivo hacia la titular, "
  "cobros a billetera personal y registro contable opaco). El destino del grueso del dinero de los "
  "préstamos (~S/221 mil de deuda nueva en 2025) <b>no es trazable</b> con los archivos disponibles "
  "y exige los estados de cuenta bancarios.")
gap(2)

rows = [
    ["A1", "Cirugías sin licencia (solo tenía permiso de consultorio)", "Regulatoria/penal", "ALTA"],
    ["A2", "Fallecimiento de paciente; investigación fiscal por homicidio culposo", "Penal", "ALTA"],
    ["A3", "Clausura del local y multa (1 UIT) por la Municipalidad de Yanahuara", "Administrativa", "ALTA"],
    ["A4", "Empresa vinculada (Delgado & Coila S.A.C.) con RUC en BAJA DE OFICIO", "Tributaria", "MEDIA"],
    ["B1", "~S/183k de deuda BBVA de la empresa contraída sin informar al socio", "Societaria", "ALTA"],
    ["B2", "~S/38k de deuda personal de la titular (abr-2025), siendo avalista de la empresa", "Financiera", "ALTA"],
    ["B3", "S/67,302 en efectivo retirado a la titular (KTY/KATY) sin sustento", "Contable", "ALTA"],
    ["B4", "Cobros de pacientes a Yape personal de la titular (comingling)", "Contable", "MEDIA"],
    ["B5", "Destino de los préstamos no trazable en caja (requiere banco)", "Control interno", "MEDIA"],
    ["B6", "Caja informal: misma columna ingreso/egreso, errores de fecha, duplicados", "Control interno", "MEDIA"],
]
data, st = sev_table(rows, ["#", "Hallazgo", "Tipo", "Severidad"])
tb = Table(data, colWidths=[10 * mm, 96 * mm, 36 * mm, 22 * mm], repeatRows=1)
tb.setStyle(TableStyle(st))
story.append(tb)
rule()

# ===================== 2. BLOQUE A =====================
P("2. Bloque A — Irregularidades regulatorias y legales (fuentes públicas)", H1)
bullets([
    "<b>A1/A2/A3 — Caso del fallecimiento (abril 2025).</b> Según cobertura de prensa (RPP, Trome, "
    "Perú21, Infobae, El Búho, Inforegión), una suboficial PNP falleció tras una cirugía estética "
    "realizada el 3–4 de abril de 2025 en el local de Av. Bolognesi 456-B, Yanahuara —la misma "
    "dirección del domicilio fiscal del RUC—. La Municipalidad de Yanahuara determinó que el local "
    "<b>solo tenía licencia de consultorio médico, no para cirugías</b>, dispuso su <b>clausura</b> "
    "y una <b>multa de 1 UIT (~S/ 5,350)</b>. La Fiscalía abrió investigación por <b>homicidio "
    "culposo</b> contra el cirujano y su equipo.",
    "<b>A4 — Empresa vinculada inactiva.</b> &laquo;Delgado &amp; Coila /Attorney at Law S.A.C.&raquo; "
    "(RUC 20539523644), del grupo, figura en <b>BAJA DE OFICIO</b> ante SUNAT (RUC no operativo).",
])
gap(2)
P("Cruce con la caja: el mes del hecho muestra la única anomalía operativa grave del periodo "
  "(ver Bloque C).", SMALL)
rule()

# ===================== 3. BLOQUE B financiero =====================
P("3. Bloque B — Irregularidades financieras (auditoría interna)", H1)

P("3.1 Endeudamiento no informado (reportes de central de riesgo)", H2)
loan = [
    ["Deudor", "Entidad", "Hito", "Monto / saldo"],
    ["Medestetic (empresa)", "BBVA", "Desembolso nuevo ~mar-2025", "+ S/ 76,000 aprox."],
    ["Medestetic (empresa)", "BBVA", "Desembolso nuevo ~jun-2025 (post-crisis)", "+ S/ 107,000 aprox."],
    ["Medestetic (empresa)", "BBVA", "Saldo vigente (19/06/2026)", "S/ 103,620.45"],
    ["Katia (personal)", "Interbank/BBVA", "De S/0 (mar-25) a S/38k (abr-25)", "+ S/ 38,000 aprox."],
    ["Katia (personal)", "Interbank+BBVA", "Saldo vigente (19/06/2026)", "S/ 54,853.55"],
]
tl = Table(loan, colWidths=[42 * mm, 30 * mm, 62 * mm, 30 * mm], repeatRows=1)
tl.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f3460")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("FONTNAME", (0, 0), (-1, -1), "DV"),
    ("FONTNAME", (0, 0), (-1, 0), "DV-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 8.3),
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f3f4f8")]),
    ("LEFTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
]))
story.append(tl)
gap(3)
bullets([
    "Deuda <b>nueva</b> en 2025 ≈ <b>S/ 221 mil</b> (empresa + personal). La titular es además "
    "<b>avalista</b> del crédito de la empresa (garantía BBVA ~S/ 47k): su patrimonio respalda una "
    "deuda societaria que el dueño económico declara desconocer.",
    "Ambas deudas están <b>al día</b> (calificación Normal, sin vencidos) y la de la empresa "
    "<b>se amortiza</b> desde jul-2025 — dato atenuante para la continuidad del negocio.",
])

P("3.2 Salida de efectivo hacia la titular y opacidad de caja", H2)
ek = EGR["por_categoria"]
retiro = ek.get("Retiro a KATIA (KTY/KATY)", {}).get("monto", 67302)
ing = EGR["ingresos_pacientes"]
egr = EGR["egresos_internos"]
catrows = [["Categoría de egreso", "Monto S/", "% egresos"]]
for cat, v in sorted(ek.items(), key=lambda x: -x[1]["monto"]):
    pct = 100 * v["monto"] / egr if egr else 0
    catrows.append([cat, f"{v['monto']:,.0f}", f"{pct:.1f}%"])
tc = Table(catrows, colWidths=[100 * mm, 35 * mm, 25 * mm], repeatRows=1)
tc.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f3460")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("FONTNAME", (0, 0), (-1, -1), "DV"),
    ("FONTNAME", (0, 0), (-1, 0), "DV-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 8.2),
    ("ALIGN", (1, 0), (-1, -1), "RIGHT"),
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f3f4f8")]),
    ("LEFTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 2.5),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 2.5),
]))
# resaltar fila de KATIA
for i, r in enumerate(catrows[1:], start=1):
    if "KATIA" in r[0].upper():
        tc.setStyle(TableStyle([("BACKGROUND", (0, i), (-1, i), colors.HexColor("#fdEbea")),
                                ("FONTNAME", (0, i), (-1, i), "DV-Bold")]))
story.append(tc)
gap(3)
bullets([
    f"<b>S/ {retiro:,.0f}</b> retirados en efectivo a nombre de &laquo;KTY/KATY&raquo; en 71 asientos, "
    "sin contraparte de paciente ni concepto de gasto. Montos redondos (S/8,500; S/5,000; S/5,393) y "
    "concentración en ene-2026 (S/18,563) y ene-2025 (S/12,514).",
    "Al menos <b>18 cobros de pacientes</b> ingresaron al <b>Yape personal</b> de la titular "
    "(&laquo;YAPE KTY&raquo;) desde jun-2025 — dinero de la empresa fuera de sus cuentas.",
    f"Reconciliación de caja: ingresos S/ {ing:,.0f} vs. egresos S/ {egr:,.0f} → diferencia "
    f"≈ S/ {ing - egr:,.0f} que debió depositarse en banco. Los desembolsos grandes de BBVA "
    "<b>no transitan por esta caja</b>: su destino solo se ve con el estado de cuenta bancario.",
])
rule()

# ===================== 4. BLOQUE C línea de tiempo =====================
P("4. Bloque C — Línea de tiempo: el caso explica los movimientos", H1)
P("El hueco operativo y el desplome de ingresos de abril 2025 coinciden con el fallecimiento y la "
  "clausura; los préstamos aparecen inmediatamente después.")
gap(2)
tdata = [
    ["Fecha", "Caja / Finanzas", "Hecho del caso"],
    ["~mar-2025", "Desembolso BBVA empresa +S/76k", "Operación normal"],
    ["03–04 abr-2025", "Ingresos del mes caen a S/98k (vs ~S/212k en mar)", "Fallecimiento de la paciente"],
    ["06–08 / 14–20 abr-2025", "Huecos de caja de 3 y 7 días seguidos", "Clausura municipal; prensa"],
    ["abr-2025", "Katia toma ~S/38k de deuda personal", "Liquidez / costos legales"],
    ["jun-2025", "Desembolso BBVA +S/107k; 1er 'PRESTAMO BBVA' en caja; gasto notarial", "Aftermath del escándalo"],
    ["jul-2025 →", "Ingresos se normalizan; inicia amortización", "Reapertura / continuidad"],
    ["14-mar-2026", "Último registro de caja", "La empresa sigue operando"],
]
tt = Table(tdata, colWidths=[34 * mm, 78 * mm, 48 * mm], repeatRows=1)
tt.setStyle(TableStyle([
    ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0f3460")),
    ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
    ("FONTNAME", (0, 0), (-1, -1), "DV"),
    ("FONTNAME", (0, 0), (-1, 0), "DV-Bold"),
    ("FONTSIZE", (0, 0), (-1, -1), 8.2), ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ("GRID", (0, 0), (-1, -1), 0.4, colors.HexColor("#bbbbbb")),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#f3f4f8")]),
    ("BACKGROUND", (0, 2), (-1, 3), colors.HexColor("#fdEbea")),
    ("LEFTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 3),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 3),
]))
story.append(tt)
rule()

# ===================== 5. RECOMENDACIONES =====================
P("5. Recomendaciones (cómo cerrar el rastreo)", H1)
bullets([
    "Solicitar a <b>BBVA</b> el estado de cuenta de la empresa (mar-2025→hoy) y los "
    "<b>contratos/cronogramas</b> de los dos créditos 2025: ver a qué cuentas/beneficiarios salió el dinero.",
    "Solicitar el estado de cuenta <b>Interbank de Katia</b> (abr-2025→): destino del préstamo de "
    "libre disponibilidad (~S/34k).",
    "Conciliar <b>caja ↔ banco ↔ ventas declaradas a SUNAT</b>, aislando los S/67k &laquo;KTY&raquo; "
    "y los cobros por Yape personal.",
    "Verificar en <b>SUNARP</b> la titularidad registral de la E.I.R.L. y si los préstamos/avales "
    "contaban con autorización del titular; evaluar acciones societarias y, de corresponder, penales.",
    "Regularizar la situación de licencias del establecimiento y el estado del RUC del estudio vinculado.",
])
rule()
P("Fuentes: SUNAT (vía apis.net.pe), datosperu.org, prensa citada en el dossier público del "
  "proyecto; reportes de central de riesgo (Mi Sentinel) de la empresa y de la titular (datos SBS "
  "al 31/05/2026, emitidos 22/06/2026); caja contable interna CAJA_2025_2026.xlsx. Análisis "
  "reproducible en src/audit_caja.py y src/audit_egresos.py.", SMALL)


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7)
    canvas.setFillColor(colors.HexColor("#888888"))
    canvas.drawString(20 * mm, 10 * mm, "Dossier de irregularidades — Medestetic E.I.R.L. — CONFIDENCIAL / uso interno")
    canvas.drawRightString(190 * mm, 10 * mm, "Pág. %d" % doc.page)
    canvas.restoreState()


doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=20 * mm, rightMargin=20 * mm,
                        topMargin=16 * mm, bottomMargin=16 * mm,
                        title="Dossier de Irregularidades - Medestetic",
                        author="Auditoría interna")
doc.build(story, onFirstPage=footer, onLaterPages=footer)
print("PDF generado:", OUT)
