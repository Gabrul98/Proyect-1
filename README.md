# PROYECTO C-4 — club sin nombre

**Cuesta de Cayma N°4 · Quebrada San Jacinto · Cayma · Arequipa, Perú**

Propuesta integral para un club nocturno boutique ultra premium, 100 % subterráneo
e insonorizado, bajo un edificio que de día vive como café de especialidad y
restaurante day-to-night. De noche, los que saben cruzan una puerta de acero sin
letrero y descienden a **La Catedral**: una pista bajo un vacío de ~9.6 m que
atraviesa tres sótanos, con mezzanine de boxes VIP, lounge-antesala y un speakeasy
oculto — **El Secreto** — al que ni siquiera todos los de adentro saben llegar.

| Dato | Valor |
|---|---|
| Lote | 298.36 m² (frente 9.74 m, fondo ~37 m) — partida 11435687 |
| Normativa | ZRE-CH · Certificado N° 056-2024-MDC-GDU (vigente) |
| Programa | 7 niveles: 3 sótanos (club) + 3 pisos y azotea (día) |
| Área techada | 601 m² sobre rasante (coef. 2.01 ≤ 2.1) + 759 m² de sótanos |
| Aforo | 350 (club) + 110 (día) |
| Acceso | Fase 1: solo por referido → Fase 2: membresía anual |
| Llegada | 100 % drop-off sobre Calle Cacique Alpaca |
| CAPEX | ~USD 3.4 M |

## Ver la propuesta en 3D

```bash
cd web && python3 -m http.server 8000
# abrir http://localhost:8000
```

Dos modos:
- **Maqueta** — vista isométrica con niveles «explotables»; clic en cualquier zona
  abre su ficha técnica (m², aforo, sonido, iluminación).
- **Recorrido** — camina dentro del edificio en primera persona (WASD + ratón, o
  joystick táctil) con la escena nocturna encendida; las escaleras cambian de nivel.

No requiere internet ni build step: Three.js está vendorizado en `web/vendor/`.

## Estructura del repositorio

```
dossier/    11 capítulos: resumen ejecutivo, sitio y normativa, arquitectura,
            acústica, sonido, iluminación y video, flujos y consumo, F&B y
            hospitalidad, marca y experiencia, operación y seguridad, negocio
planos/     A-01…A-09: emplazamiento, 7 plantas y corte longitudinal (SVG)
web/        visor 3D estático (Three.js por CDN)
  data/levels.js   ← FUENTE ÚNICA DE VERDAD: geometría, zonas, m², aforos y
                     fichas técnicas; alimenta el visor y es la referencia
                     de coherencia de todo el dossier y los planos
```

## Los tres principios del proyecto

1. **El mito se construye con silencio.** Sin nombre, sin letrero, sin publicidad:
   solo un símbolo en la puerta y una lista de referidos. La marca visible es la
   del café que lo oculta.
2. **La acústica es la póliza de seguro.** Box-in-box completo (losa flotante,
   doble muro, esclusas, silenciadores): un club inaudible desde la vereda en un
   distrito residencial monumental, o no hay licencia que sobreviva.
3. **El edificio nunca duerme.** Café (7:00–20:00), restaurante (12:00–23:00 →
   antesala), salones corporativos de día, club jueves a sábado: cada m² produce
   los 7 días de la semana.
