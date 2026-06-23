"""Parser del perfil de empresa de datosperu.org."""
import re
from bs4 import BeautifulSoup


def _lines(html):
    soup = BeautifulSoup(html, "html.parser")
    for t in soup(["script", "style"]):
        t.decompose()
    raw = soup.get_text("\n")
    out = []
    for l in raw.split("\n"):
        l = re.sub(r"\s+", " ", l).strip()
        if l:
            out.append(l)
    return out, soup


# Etiquetas de la sección "DATOS DE LA EMPRESA": label -> clave normalizada
_KV_LABELS = {
    "Tipo Contribuyente": "tipo_contribuyente",
    "Estado Contribuyente": "estado_ruc",
    "Condición Contribuyente": "condicion_domicilio",
    "Fecha Inscripción": "fecha_inscripcion",
    "Fecha Inicio Actividades": "inicio_actividades",
    "Sistema Emisión Comprobantes": "sistema_emision",
    "Sistema Contabilidad": "sistema_contabilidad",
    "Actividad Comercio Exterior": "comercio_exterior",
    "Comprobantes de Pago Autorizados": "comprobantes_autorizados",
    "Nombre Comercial": "nombre_comercial",
}


def parse(html):
    lines, soup = _lines(html)
    data = {}

    # Pares clave-valor (la etiqueta está en una línea y el valor en la siguiente)
    for i, l in enumerate(lines):
        if l in _KV_LABELS and i + 1 < len(lines):
            data[_KV_LABELS[l]] = lines[i + 1]

    # Domicilio fiscal: 2 líneas tras "Domicilio Fiscal"
    for i, l in enumerate(lines):
        if l == "Domicilio Fiscal" and i + 1 < len(lines):
            data["domicilio_direccion"] = lines[i + 1]
            if i + 2 < len(lines) and " - " in lines[i + 2]:
                data["domicilio_ubigeo_txt"] = lines[i + 2]
            break

    # Comprobantes electrónicos
    ce = []
    for i, l in enumerate(lines):
        if l == "Comprobantes Electrónicos":
            j = i + 1
            while j < len(lines) and lines[j] in ("FACTURA", "BOLETA", "NOTA DE CREDITO",
                                                  "NOTA DE DEBITO", "GUIA DE REMISION") :
                ce.append(lines[j]); j += 1
            break
    if ce:
        data["comprobantes_electronicos"] = ce

    # CIIU principal y secundarias
    ciiu_pri, ciiu_sec = "", []
    for i, l in enumerate(lines):
        m = re.match(r"CIIU:\s*(\d+)", l)
        if m and i + 2 < len(lines):
            code = m.group(1)
            tipo = lines[i + 1]
            desc = lines[i + 2]
            entry = f"{code} - {desc}"
            if tipo.lower().startswith("princ"):
                ciiu_pri = entry
            else:
                ciiu_sec.append(entry)
    data["ciiu_principal"] = ciiu_pri
    data["ciiu_secundarias"] = ciiu_sec

    # Representantes: tabla cuyo encabezado es exactamente Nombre/Cargo/Desde
    reps = []
    for table in soup.find_all("table"):
        rows = table.find_all("tr")
        if not rows:
            continue
        head = [c.get_text(" ", strip=True).lower() for c in rows[0].find_all(["td", "th"])]
        head = [h for h in head if h]
        if head[:3] != ["nombre", "cargo", "desde"]:
            continue
        for tr in rows[1:]:
            cells = [re.sub(r"\s+", " ", c.get_text(" ", strip=True)).strip()
                     for c in tr.find_all(["td", "th"])]
            cells = [c for c in cells if c]
            if len(cells) < 3:
                continue
            nombre, cargo, desde = cells[0], cells[1], cells[-1]
            n_emp = re.search(r"(\d+)\s*empresas?", nombre)
            n_empresas = n_emp.group(1) if n_emp else None
            nombre = re.sub(r"\s*\d+\s*empresas?\s*", " ", nombre).strip()
            reps.append({"nombre": nombre, "cargo": cargo, "desde": desde,
                         "n_empresas_vinculadas": n_empresas})
        break
    data["representantes"] = reps

    # Trabajadores: tomar el registro más reciente de la tabla de personal
    trabajadores = None
    for i, l in enumerate(lines):
        if re.fullmatch(r"\d{4}-\d{2}", l) and i + 1 < len(lines) and re.fullmatch(r"\d+", lines[i + 1]):
            trabajadores = {"periodo": l, "nro_trabajadores": lines[i + 1]}
            break  # el primero es el más reciente
    data["trabajadores"] = trabajadores

    # Deuda en cobranza coactiva (programas Reactiva/Covid declaran el flag)
    coactiva_flags = []
    for i, l in enumerate(lines):
        if "cobranza coactiva" in l.lower() and i + 1 < len(lines):
            coactiva_flags.append(lines[i + 1].upper())
    data["coactiva_flags"] = coactiva_flags

    # Normas legales / contrataciones / marcas (señales presentes en el perfil)
    full = "\n".join(lines)
    data["sin_contrataciones"] = "No hay contrataciones registradas" in full
    data["sin_normas_legales"] = "No se encontraron normas legales" in full
    data["sin_marcas"] = "No hay marcas registradas" in full
    data["ranking"] = ""
    mr = re.search(r"RANKING:\s*#?([\d,]+)", full)
    if mr:
        data["ranking"] = mr.group(1)

    return data
