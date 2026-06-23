# Due Diligence — Grupo empresarial (Arequipa, Perú)

Investigación corporativa de fuentes **públicas** sobre 4 empresas peruanas
vinculadas y su persona nexo, consolidada en un dossier estructurado con
evaluación de riesgo (semáforo).

> ⚠️ Documento OSINT. **No reemplaza** un reporte de central de riesgo
> (Infocorp/Sentinel) ni una verificación registral oficial (SUNAT/SUNARP).

## Entidades

| # | Razón social | RUC | Rol | Estado RUC |
|---|---|---|---|---|
| 1 | Corporación Médica Medestetic E.I.R.L. | 20606589051 | Principal | ACTIVO 🔴 |
| 2 | Fenixzone E.I.R.L. | 20606592176 | Vinculada | ACTIVO 🟡 |
| 3 | Inversiones Zevallos Rodriguez E.I.R.L. | 20608634241 | Vinculada | ACTIVO 🟡 |
| 4 | Delgado & Coila /Attorney at Law S.A.C. | 20539523644 | Vinculada | BAJA DE OFICIO 🔴 |

Persona nexo: **Katia Gloria Delgado Chirinos** (DNI 41055232) — titular-gerente
común de las 3 E.I.R.L.

## Estructura

```
src/      pipeline (config, lib, parsers, builders)
data/     empresas.json (entregable normalizado)
raw/      crudos (JSON de API + HTML de perfiles y prensa) para trazabilidad
dossier/  dossier.md (fichas + grafo) y matriz_riesgo.md (semáforo)
```

## Fuentes

1. **api.apis.net.pe/v1/ruc** — espejo del padrón SUNAT (gratis, sin token).
   SUNAT e-consultaruc directo está bloqueado por WAF para acceso automatizado.
2. **datosperu.org** — perfil público por empresa (identidad, CIIU, fechas,
   comprobantes, representantes, trabajadores, deuda coactiva declarada).
3. **Búsqueda web pública** — prensa, redes sociales (Fases de reputación).
4. Poder Judicial (CEJ), OSCE/SEACE e INDECOPI exigen captcha/acceso: se
   marcan como **"requiere acceso"** y no se evaden.

## Reproducir

```bash
python3 -m venv .venv && . .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # (tokens opcionales; el flujo base no los necesita)

python3 src/collect.py        # Fases 1-2: recolecta y guarda crudos en /raw
python3 src/build_dossier.py  # Fase 6: normaliza a data/empresas.json
python3 src/render_md.py       # Fase 6: genera dossier/*.md
```

## Reglas aplicadas

- Solo datos públicos; sin evadir logins/captchas/paywalls.
- Rate limiting (~2.5 s/dominio) con reintentos exponenciales; respeta robots.txt.
- Dato ausente → `"no disponible públicamente"`; dato tras barrera → `"requiere acceso"`.
- Cada dato lleva fuente y fecha de captura. Crudos preservados en `/raw`.
