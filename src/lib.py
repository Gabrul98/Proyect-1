"""Utilidades HTTP con rate limiting, reintentos y guardado de crudos."""
import os
import time
import json
import requests
from urllib.parse import urlparse

from config import USER_AGENT, RATE_LIMIT_SECONDS, RAW_DIR

_last_hit = {}  # dominio -> timestamp del último request

_session = requests.Session()
_session.headers.update({
    "User-Agent": USER_AGENT,
    "Accept-Language": "es-PE,es;q=0.9,en;q=0.8",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
})


def _respect_rate_limit(url):
    dom = urlparse(url).netloc
    now = time.time()
    last = _last_hit.get(dom, 0)
    wait = RATE_LIMIT_SECONDS - (now - last)
    if wait > 0:
        time.sleep(wait)
    _last_hit[dom] = time.time()


def fetch(url, max_retries=4, timeout=30, **kwargs):
    """GET con rate limiting por dominio y backoff exponencial (2,4,8,16s)."""
    _respect_rate_limit(url)
    delay = 2
    last_exc = None
    for attempt in range(max_retries):
        try:
            r = _session.get(url, timeout=timeout, allow_redirects=True, **kwargs)
            if r.status_code in (429, 500, 502, 503, 504):
                raise requests.HTTPError(f"status {r.status_code}")
            # datosperu sirve UTF-8 pero a veces sin charset; evita mojibake
            if r.encoding and r.encoding.lower() in ("iso-8859-1", "latin-1"):
                r.encoding = r.apparent_encoding or "utf-8"
            return r
        except Exception as e:  # noqa: BLE001
            last_exc = e
            if attempt < max_retries - 1:
                time.sleep(delay)
                delay *= 2
    raise last_exc


def save_raw(name, content, binary=False):
    """Guarda el crudo en /raw para trazabilidad."""
    os.makedirs(RAW_DIR, exist_ok=True)
    path = os.path.join(RAW_DIR, name)
    mode = "wb" if binary else "w"
    enc = None if binary else "utf-8"
    with open(path, mode, encoding=enc) as f:
        f.write(content)
    return path


def save_json(path, obj):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
    return path


def today():
    return time.strftime("%Y-%m-%d")
