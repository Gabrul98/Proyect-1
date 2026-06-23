"""Fase 1-2: recolecta SUNAT(API)/datosperu, guarda crudos y normaliza a JSON."""
import os
import sys
import json

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from config import COMPANIES, NEXO, RAW_DIR, DATA_DIR, NA
from lib import fetch, save_raw, save_json, today
import parse_datosperu

APIS_NET = "https://api.apis.net.pe/v1/ruc?numero={ruc}"
DATOSPERU = "https://www.datosperu.org/{slug}.php"
SUNAT_NOTE = ("SUNAT e-consultaruc bloquea el acceso automatizado desde IP de "
              "datacenter mediante WAF ('Request Rejected'); se usa la API "
              "espejo de SUNAT (apis.net.pe) y datosperu.org como fuentes "
              "públicas equivalentes. Registrado como 'requiere acceso' para "
              "verificación manual.")


def collect_company(c):
    ruc = c["ruc"]
    print(f"  -> RUC {ruc} {c['razon_social']}")
    rec = {"ruc": ruc, "razon_social": c["razon_social"], "rol": c["rol"]}

    # 1) apis.net.pe (espejo SUNAT)
    try:
        r = fetch(APIS_NET.format(ruc=ruc))
        save_raw(f"apisnet_ruc_{ruc}.json", r.text)
        rec["apisnet"] = r.json()
    except Exception as e:  # noqa: BLE001
        rec["apisnet"] = {"_error": str(e)}

    # 2) datosperu.org
    try:
        r = fetch(DATOSPERU.format(slug=c["datosperu_slug"]))
        save_raw(f"datosperu_{ruc}.html", r.text)
        rec["datosperu"] = parse_datosperu.parse(r.text)
    except Exception as e:  # noqa: BLE001
        rec["datosperu"] = {"_error": str(e)}

    return rec


def main():
    os.makedirs(RAW_DIR, exist_ok=True)
    os.makedirs(DATA_DIR, exist_ok=True)
    raw_records = []
    print("[Fase 1-2] Recolectando empresas...")
    for c in COMPANIES:
        raw_records.append(collect_company(c))

    # Persona nexo via apis.net.pe DNI
    print(f"  -> Persona nexo DNI {NEXO['dni']}")
    try:
        r = fetch("https://api.apis.net.pe/v1/dni?numero=" + NEXO["dni"])
        save_raw(f"apisnet_dni_{NEXO['dni']}.json", r.text)
        nexo_data = r.json()
    except Exception as e:  # noqa: BLE001
        nexo_data = {"_error": str(e)}

    out = {"_meta": {"fecha_captura": today(), "sunat_nota": SUNAT_NOTE},
           "empresas": raw_records, "nexo": {**NEXO, "apisnet": nexo_data}}
    save_json(os.path.join(DATA_DIR, "_collected_raw.json"), out)
    print(f"[Fase 1-2] OK. {len(raw_records)} empresas + nexo recolectados.")


if __name__ == "__main__":
    main()
