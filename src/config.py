"""Configuración central del proyecto de due diligence."""
import os

PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW_DIR = os.path.join(PROJECT_ROOT, "raw")
DATA_DIR = os.path.join(PROJECT_ROOT, "data")
DOSSIER_DIR = os.path.join(PROJECT_ROOT, "dossier")

USER_AGENT = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/120.0 Safari/537.36 (due-diligence-research)"
)

# Rate limiting: segundos entre requests al mismo dominio
RATE_LIMIT_SECONDS = 2.5

# Entidades objetivo. El slug de datosperu fue verificado por resolución HTTP.
COMPANIES = [
    {
        "ruc": "20606589051",
        "razon_social": "CORPORACION MEDICA MEDESTETIC E.I.R.L.",
        "rol": "Principal",
        "datosperu_slug": "empresa-corporacion-medica-medestetic-eirl-20606589051",
    },
    {
        "ruc": "20606592176",
        "razon_social": "FENIXZONE E.I.R.L",
        "rol": "Vinculada",
        "datosperu_slug": "empresa-fenixzone-eirl-20606592176",
    },
    {
        "ruc": "20608634241",
        "razon_social": "INVERSIONES ZEVALLOS RODRIGUEZ E.I.R.L.",
        "rol": "Vinculada",
        "datosperu_slug": "empresa-inversiones-zevallos-rodriguez-eirl-20608634241",
    },
    {
        "ruc": "20539523644",
        "razon_social": "DELGADO & COILA /ATTORNEY AT LAW S.A.C.",
        "rol": "Vinculada",
        "datosperu_slug": "empresa-delgado-coila-attorney-at-law-sac-20539523644",
    },
]

# Persona nexo (representante / socia común)
NEXO = {
    "tipo": "persona_natural",
    "nombre": "DELGADO CHIRINOS KATIA GLORIA",
    "dni": "41055232",
    "rol": "Representante / titular común a investigar",
}

NA = "no disponible públicamente"
