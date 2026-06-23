"""Fase 5: evidencia de huella digital, reputación y prensa (fuentes web abiertas).

Recopilada vía búsqueda web pública el 2026-06-23. Cada ítem lleva su fuente.
NO se incluye nada no verificado en al menos una fuente pública citable.
"""

CAPTURA = "2026-06-23"

# Indexado por RUC
WEB_EVIDENCE = {
    "20606589051": {  # Medestetic / Bodytite
        "web_oficial": "no disponible públicamente (sin sitio web propio verificado)",
        "redes": [
            {"red": "Facebook", "handle": "Bodytite Arequipa",
             "url": "https://www.facebook.com/corporacionmedicaarequipa/",
             "fuente": "facebook.com", "fecha_captura": CAPTURA},
            {"red": "Instagram", "handle": "@bodytite_arequipa",
             "url": "https://www.instagram.com/bodytite_arequipa",
             "fuente": "dato de la tarea / Instagram", "fecha_captura": CAPTURA},
        ],
        "nombre_comercial_publico": "Bodytite Arequipa / centro Bodytite (marca con la que opera públicamente)",
        "google_rating": "no disponible públicamente (Google Places requiere API key/clave)",
        "google_resenas": "no disponible públicamente",
        "prensa_riesgo": [
            {
                "titular": "Medestetic, donde falleció policía por cirugía plástica, no tenía licencia para operar",
                "resumen": ("Una suboficial de la PNP (Diviac), Yuliana Wendy Huamaní "
                            "Benavidez (28), falleció tras una cirugía estética realizada "
                            "el 3-4 de abril de 2025 en el centro ubicado en Av. Bolognesi "
                            "456-B, Yanahuara (misma dirección que el domicilio fiscal del "
                            "RUC). La Municipalidad de Yanahuara determinó que el local solo "
                            "tenía licencia para consultorio médico, no para cirugías; "
                            "dispuso la clausura y una multa de 1 UIT (~S/ 5,350)."),
                "fuentes": [
                    "https://rpp.pe/peru/arequipa/arequipa-inician-investigacion-preliminar-por-muerte-de-suboficial-tras-someterse-a-cirugia-estetica-noticia-1627047",
                    "https://www.apnoticias.pe/peru/el-buho/arequipa-medestetic-donde-fallecio-policia-por-cirugia-plastica-no-tenia-licencia-para-operar-1414638",
                    "https://inforegion.pe/arequipa-medestetic-donde-hicieron-cirugia-plastica-a-policia-que-fallecio-no-tenia-licencia-para-operar/",
                    "https://trome.com/actualidad/nacional/tragedia-en-arequipa-policia-de-la-diviac-muere-tras-someterse-a-cirugia-estetica-en-clinica-sin-licencia-noticia/",
                    "https://peru21.pe/peru/arequipa-joven-policia-fallece-tras-someterse-una-cirugia-estetica/",
                ],
                "fecha_hecho": "abril de 2025",
                "fecha_captura": CAPTURA,
            },
            {
                "titular": "Fiscalía investiga a cirujano y equipo de Corporación Médica Medestetic por homicidio culposo",
                "resumen": ("El Ministerio Público inició investigación preliminar por "
                            "presunto homicidio culposo (negligencia médica) contra el "
                            "cirujano Ronner Ruiz y su equipo. Un medio (pancarta.pe) "
                            "reportó que el médico investigado se encontraba prófugo/"
                            "inubicable."),
                "fuentes": [
                    "https://rpp.pe/peru/arequipa/arequipa-inician-investigacion-preliminar-por-muerte-de-suboficial-tras-someterse-a-cirugia-estetica-noticia-1627047",
                    "https://www.pancarta.pe/notas-imprescindibles/arequipa/medico-profugo-muerte-cirugia-estetica/",
                ],
                "fecha_hecho": "abril de 2025",
                "fecha_captura": CAPTURA,
            },
        ],
    },
    "20606592176": {  # Fenixzone
        "web_oficial": "no disponible públicamente",
        "redes": [],
        "google_rating": "no disponible públicamente",
        "google_resenas": "no disponible públicamente",
        "prensa_riesgo": [],
    },
    "20608634241": {  # Inversiones Zevallos Rodriguez
        "web_oficial": "no disponible públicamente",
        "redes": [],
        "google_rating": "no disponible públicamente",
        "google_resenas": "no disponible públicamente",
        "prensa_riesgo": [],
    },
    "20539523644": {  # Delgado & Coila / Attorney at Law
        "web_oficial": "no disponible públicamente (no se halló sitio propio verificable)",
        "redes": [],
        "google_rating": "no disponible públicamente",
        "google_resenas": "no disponible públicamente",
        "prensa_riesgo": [],
    },
}

# Evidencia sobre la persona nexo
NEXO_EVIDENCE = {
    "perfil": ("Abogada de profesión. Figura como TITULAR-GERENTE de las 3 EIRL del "
               "grupo (Medestetic, Fenixzone, Inversiones Zevallos Rodriguez) y su "
               "apellido vincula con el estudio 'Delgado & Coila / Attorney at Law "
               "S.A.C.'. Fue candidata en las Elecciones Regionales/Municipales 2022."),
    "fuentes": [
        {"dato": "Candidata Elecciones 2022 (DNI 41055232)",
         "fuente": "https://otorongo.club/2022/candidate/41055232/", "fecha_captura": CAPTURA},
        {"dato": "Perfil de candidata 2022",
         "fuente": "https://peruvotoinformado.com/2022/p/katia-gloria-delgado-chirinos",
         "fecha_captura": CAPTURA},
        {"dato": "Titular-gerente de 3 empresas",
         "fuente": "https://www.datosperu.org/empresa-corporacion-medica-medestetic-eirl-20606589051.php",
         "fecha_captura": CAPTURA},
    ],
}
