# 03 · Ingeniería Acústica

Proyecto C-4 · Cuesta de Cayma N°4, Cayma, Arequipa

---

La acústica no es un capítulo más de este proyecto: es **la** condición de existencia. Un club con SPL de pista de 112–115 dB(A) en un lote de 9.74 m de frente, con viviendas pegadas a ambos linderos laterales, dentro de un Ambiente Urbano Monumental (ZRE-CH) donde el Estándar de Calidad Ambiental para ruido nocturno residencial es **50 dB(A) en exterior** (D.S. 085-2003-PCM), solo es viable si el aislamiento se diseña desde la cimentación. Ese es exactamente el partido arquitectónico: el club entero vive bajo tierra, en tres sótanos, dentro de una caja acústica independiente de la estructura. En la vereda, el club no existe.

## 3.1 Marco normativo y criterio de diseño

| Referencia | Exigencia | Criterio adoptado C-4 |
|---|---|---|
| D.S. 085-2003-PCM (ECA Ruido) — zona residencial, horario nocturno (22:01–07:00) | ≤ 50 dB(A) LAeqT en exterior | Inmisión atribuible al club ≤ 25 dB(A) en fachada del vecino más expuesto: **margen ≥ 25 dB** |
| ISO 1996-2 / NTP-ISO 1996 | Protocolo de medición de inmisión | Adoptado para línea base y verificación |
| RNE A.100 / A.130, ITSE | Recintos de reunión, evacuación | Puertas acústicas certificadas también cortafuego |
| Licencia de funcionamiento (práctica municipal para discotecas) | Limitación y monitoreo de emisión | Limitador sellado + registro continuo 24/7 (§3.6) |

**Criterio rector:** no se diseña "para cumplir 50 dB(A)"; se diseña para que la contribución del club quede **por debajo del ruido de fondo nocturno del barrio** (típicamente 35–45 dB(A) en Cayma tradicional, a verificar con línea base). Cumplir con margen es lo que hace la licencia defendible año tras año.

## 3.2 Por qué bajo tierra + box-in-box lo hace alcanzable

El problema de un club en superficie son los **caminos débiles**: fachadas, ventanas, puertas y cubiertas rara vez superan Rw 50–55 dB, y en 63 Hz (donde vive el kick de la música electrónica) el aislamiento real cae dramáticamente. El Proyecto C-4 elimina esos caminos de raíz:

1. **No hay fachada del club.** El 100 % del programa sonoro está entre −3.5 y −10.5 m. Los muros perimetrales de los sótanos son **muros pantalla de concreto armado de 60 cm** (≈ 1,440 kg/m²), exigidos de todos modos por la excavación de ~10.9 m. La ley de masas ya aporta un aislamiento base muy alto en bajas frecuencias, y el terreno circundante añade amortiguamiento y carga que una fachada jamás tendrá.
2. **El único camino restante es estructural** (vibración transmitida por la losa y los muros hacia las cimentaciones vecinas). Ese camino se corta con el sistema **box-in-box**: ninguna superficie interior del club toca rígidamente la estructura. La energía debe cruzar un apoyo elástico calibrado antes de tocar concreto compartido con el vecino.
3. **La emisión aérea residual** solo puede salir por los accesos y la ventilación — y ambos se tratan como esclusas y silenciadores dedicados (§3.3.4 y §3.3.5).

El resultado: el objetivo de aislamiento global **≥ 75–80 dB en las bandas de 63–125 Hz hacia los linderos** —imposible en una edificación convencional en superficie— aquí es la suma de tres barreras en serie: caja interior elástica + muro pantalla masivo + terreno.

## 3.3 Sistema de aislamiento box-in-box

### 3.3.1 Losa flotante (S−3, La Catedral)

- Losa de piso técnico de concreto armado de **12–15 cm** vaciada sobre apoyos elastoméricos discretos de poliuretano celular (tipo Sylodyn/Sylomer), dimensionados por carga real (pista 120 pax + escenografía + anclajes de kinetic lights).
- **Frecuencia natural del sistema ≤ 10 Hz** (deflexión estática ≥ 2.5 mm bajo carga de servicio). A 63 Hz —más de 6 veces la frecuencia natural— el aislamiento vibratorio teórico supera 20 dB y en la práctica corta el camino estructural del kick.
- Junta perimetral elástica continua de 5 cm contra muros pantalla; ninguna instalación cruza la junta sin conexión flexible.
- Los **anclajes de escenografía y winches** se resuelven en la losa flotante o en subestructuras propias: nunca puentes rígidos a la estructura primaria.

### 3.3.2 Trasdosado masa–resorte–masa contra muros pantalla

- Contra los muros pantalla, en todo recinto sonoro (S−3, S−2, S−1): hoja interior independiente **autoportante** apoyada en la losa flotante, sin ningún contacto rígido con la pantalla.
- Composición: cámara de aire **≥ 10 cm** rellena con lana mineral de 70 kg/m³ + perfilería independiente + doble/triple placa de yeso de alta densidad (12.5 mm, ≥ 40 kg/m² por hoja) + acabado (celosía de sillar, paneles).
- Frecuencia de resonancia masa–resorte–masa del conjunto < 40 Hz, para que el sistema *sume* aislamiento en la banda de 63 Hz en lugar de restarlo.

### 3.3.3 Cielo acústico suspendido bajo la losa de P1

- El techo del último sótano habitado (S−1) es el punto de contacto con el mundo diurno (café, recepción). Bajo la losa estructural de 35 cm se suspende un cielo acústico de **doble placa de alta densidad (2×15 mm)** colgado de **amortiguadores de resorte/neopreno con fn ≤ 8 Hz**, cámara de 20 cm con lana mineral.
- El mismo detalle se replica bajo las losas intermedias S−1/S−2 donde el programa musical difiere entre niveles (lounge sobre mezzanine).

### 3.3.4 Esclusas acústicas dobles en cada acceso

Cada acceso al volumen sonoro es un **vestíbulo con dos hojas acústicas en cascada**, nunca una puerta única:

| Esclusa | Ubicación (fuente: levels.js) | Composición |
|---|---|---|
| Entrada principal del club | Recepción P1 → escalera → esclusa S−1 (zona `s1-esclusa`, 10 m²) | 2 hojas Rw ≥ 45 dB, vestíbulo absorbente, cierre secuencial |
| Escalera del vacío (este) | S−1 → S−2 → S−3 | Vestíbulo con doble hoja Rw ≥ 45 dB por nivel |
| Evacuación posterior | Backstage S−3 / bodegas → Pasaje Peatonal | 2 hojas Rw ≥ 45 dB + Rf, barra antipánico, monitoreadas |
| Montacargas / montaplatos | S−3/S−2/S−1 ↔ cocina P2 | Doble compuerta acústica, cabina amortiguada |

Dos hojas Rw 45 dB separadas por un vestíbulo absorbente entregan una **atenuación conjunta ≥ 60 dB** en medios-altos — el sonido del club deja de existir en la segunda hoja, que es además parte del ritual de llegada.

### 3.3.5 Ventilación y equipos: el club respira en silencio

- **Silenciadores de celdas** (splitters) en todos los ductos de inyección y extracción del club, dimensionados para **NR-25 en recinto** y para que la boca en azotea no emita > 45 dB(A) a 1 m del lindero (zona `az-tecnica`, tras pantalla acústica de 2.4 m).
- Ductos con conexiones flexibles, revestimiento interior absorbente en los primeros tramos, velocidades ≤ 5 m/s en ramales del club (evita ruido regenerado).
- **Todo equipo rotativo** (chillers, manejadoras, extractores, grupo electrógeno insonorizado, bombas) sobre aisladores de resorte con eficiencia ≥ 95 % y bancadas de inercia; el grupo electrógeno además en cabina acústica propia.
- **Subwoofers KS28 sobre montaje antivibratorio** (tacos elastoméricos + bancada de inercia sobre la losa flotante): la vía más agresiva de energía a 40–80 Hz queda doblemente desacoplada. Los cuelgues A10i penden de subestructura con aisladores en los puntos de rigging.

### 3.3.6 Tabla resumen — soluciones constructivas por elemento

| Elemento | Solución constructiva | Desempeño estimado |
|---|---|---|
| Muros laterales (linderos) | Muro pantalla H.A. 60 cm + cámara ≥ 10 cm con lana mineral 70 kg/m³ + hoja interior independiente de placa múltiple | R'w compuesto ≥ 78 dB; **≥ 75–80 dB en 63–125 Hz** con terreno |
| Piso La Catedral | Losa flotante 12–15 cm sobre Sylodyn, fn ≤ 10 Hz, junta perimetral 5 cm | ΔLvib > 20 dB @ 63 Hz (camino estructural) |
| Techo del club (bajo P1) | Losa 35 cm + cielo 2×15 mm colgado de amortiguadores fn ≤ 8 Hz, cámara 20 cm | R'w ≥ 80 dB |
| Losas intermedias S−1/S−2 | Losa + piso flotante ligero + cielo amortiguado en el nivel inferior | R'w ≥ 65 dB entre programas musicales |
| Accesos | Esclusas dobles, hojas Rw ≥ 45 dB c/u | ≥ 60 dB conjunto |
| Ventilación | Silenciadores de celdas + flexibles + baja velocidad | NR-25 en recinto; ≤ 45 dB(A) a 1 m del lindero en azotea |
| Equipos técnicos | Aisladores de resorte/elastómero, bancadas de inercia, cabina para grupo | Transmisibilidad ≤ 5 % |

## 3.4 Verificación de cumplimiento del ECA (cadena de niveles)

Cálculo de la banda crítica de **63 Hz** (la peor para clubes: máxima energía, mínimo aislamiento relativo), camino lateral hacia el vecino más cercano:

| Etapa | Nivel / atenuación |
|---|---|
| Nivel interior en pista, banda 63 Hz (programa a 115 dB(A)) | ≈ 118 dB |
| Aislamiento compuesto hacia lindero (hoja interior + pantalla 60 cm + terreno), 63 Hz | −78 dB |
| Nivel re-radiado en la propiedad vecina, 63 Hz | ≈ 40 dB |
| Ponderación A a 63 Hz | −26 dB |
| **Contribución del club en fachada del vecino** | **≈ 14 dB(A) en 63 Hz; < 25 dB(A) banda ancha** |
| Límite ECA nocturno residencial | 50 dB(A) |
| **Margen de cumplimiento** | **≥ 25 dB** |

En bandas medias y altas el margen es aún mayor (el aislamiento compuesto supera 90 dB). El riesgo residual real es **estructural** (vibración por losa y anclajes), y es precisamente el que ataca la losa flotante con fn ≤ 10 Hz y el montaje antivibratorio de los subwoofers. La azotea, único punto con equipos al aire libre, opera tras pantalla acústica con compromiso de ≤ 45 dB(A) a 1 m del lindero, y la terraza cierra a las 18:00 sin música exterior: **ninguna fuente sonora del proyecto opera al aire libre de noche**.

## 3.5 Acústica interior

### 3.5.1 La Catedral (S−3): potencia sin barro

- **Volumen acústico:** pista de 86 m² bajo el vacío telescópico de ~9.6 m (≈ 830 m³) más los volúmenes acoplados bajo el mezzanine (barra, galerías): **volumen efectivo ≈ 900–1,000 m³**.
- **Objetivo: RT60 = 0.8–1.1 s en bandas medias (500 Hz–1 kHz)**, subiendo de forma controlada a ≤ 1.6 s en 125 Hz. Por Sabine, con ~975 m³ se requieren ≈ 145–195 m² sabins de absorción: alcanzable con el público (120 pax ≈ 55 m² sabins) más ~120 m² de tratamiento fijo.
- **Tratamiento del vacío:** paneles absorbentes de fibra mineral (50–75 mm, con velo) ocultos **tras celosía de sillar** perforada en los muros del vacío — la absorción desaparece visualmente dentro de la materialidad del proyecto. Alternancia con franjas difusoras (relieve del propio sillar) para conservar vivacidad.
- **Bass traps** de esquina (trampas de membrana + absorbentes porosos de gran espesor) en los cuatro rincones verticales del vacío y en el encuentro con el techo: controlan los modos axiales de un recinto de 6×14×9.6 m (primer modo axial vertical ≈ 18 Hz; agrupamiento modal crítico en 35–70 Hz).
- **Control de flutter entre losas del mezzanine:** los frentes de losa y las barandas de vidrio de S−2/S−1 enfrentadas al vacío generan reflexiones paralelas; se resuelve con fascias inclinadas ≥ 6°, franjas absorbentes en el canto de losa y el vidrio de baranda con leve inclinación hacia la pista (que además devuelve energía útil al público, no al techo).
- El **muro LED (6.0 × 6.5 m)** es una superficie rígida reflectante detrás del DJ: el arco de subwoofers cardioide (cap. 04) evita excitarlo, y el plenum posterior (backstage) se trata con absorción gruesa.

### 3.5.2 Recintos secundarios: acústica diferenciada por programa

| Recinto | Carácter | RT60 medios objetivo | Estrategia |
|---|---|---|---|
| Mezzanine VIP (boxes) | Ligado a La Catedral, −6 dB, "conversable" | acoplado al vacío | Cielos absorbentes sobre cada box, respaldos altos tapizados: burbujas de inteligibilidad frente al vacío |
| Lounge S−1 | Programa propio a 95 dB máx, conversación | 0.6–0.8 s | Cielo absorbente continuo, tapicerías, alfombra parcial |
| El Secreto (speakeasy, 36 m², 35 pax) | Vinilo a 85 dB máx, casi "estudio" | 0.4–0.6 s | Muy seco: absorción en cielo y muro posterior, difusión ligera en frente de barra; la palabra a 1 m manda |
| Baños / circulaciones | Programa a bajo nivel | ≤ 0.8 s | Cielos absorbentes higiénicos |
| Café P1 / Restaurante P2 | Confort conversacional | 0.8–0.9 s | Absorción integrada en cielos y mobiliario; presets día/noche solo de nivel |
| Salones P3 | Palabra + eventos | 0.6–0.9 s (variable) | Tabique móvil acústico Rw ≥ 50 dB, cortinajes de ajuste |

### 3.5.3 Tabla de objetivos por recinto (síntesis)

| Recinto | SPL máx. de operación | RT60 medios | Ruido de fondo (HVAC) |
|---|---|---|---|
| La Catedral (pista) | 112–115 dB(A) | 0.8–1.1 s | NR-25 |
| Mezzanine VIP | 106–109 dB(A) (−6 dB) | acoplado | NR-25 |
| Lounge S−1 | 95 dB(A) | 0.6–0.8 s | NR-25 |
| Balcón al vacío S−1 | −8 a −10 dB vs. pista | acoplado | NR-25 |
| El Secreto | 85 dB(A) | 0.4–0.6 s | NR-20/25 |
| Baños / circulaciones | ≤ 80 dB(A) | ≤ 0.8 s | NR-30 |
| Café / Restaurante | 70 dB(A) día · 85 dB(A) noche (P2) | 0.8–0.9 s | NR-35 |
| Salones P3 | 85 dB(A) evento | 0.6–0.9 s | NR-30 |
| Exterior (fachada, drop-off, azotea nocturna) | inmisión club < 25 dB(A) | — | cumplimiento ECA 50 dB(A) con margen |

## 3.6 Plan de mediciones, commissioning y monitoreo permanente

**Fase 0 — Línea base (antes de obra):** medición de ruido de fondo nocturno según ISO 1996-2 en fachada propia y linderos (2 noches típicas + 1 fin de semana). Fija la referencia contractual frente a vecinos y municipalidad.

**Fase 1 — Verificación en obra:** ensayos in situ de aislamiento aéreo (ISO 16283-1 / ISO 717-1) y de vibración al completar cada elemento del box-in-box (losa flotante cargada, trasdosados, esclusas), con fuente dodecaédrica + fuente de graves dedicada en 50–125 Hz. Los detalles se corrigen con la obra abierta, no después.

**Fase 2 — Commissioning con sistema real:** el sistema de sonido definitivo (cap. 04) a nivel de operación (115 dB(A) en pista, programa de graves), medición simultánea en fachada de vecinos y en puntos internos de referencia. Acta de resultados como anexo de la licencia.

**Fase 3 — Operación (permanente):**

- **Limitador sellado** sobre el bus maestro del procesador P1 (exigencia típica de licencia de discoteca): techo de emisión calibrado y precintado en presencia del inspector municipal; el personal no puede excederlo ni desactivarlo.
- **Monitoreo continuo clase 1** (tipo 10EaZy/NTi) con registro LAeq y Lceq por minuto, 24/7, respaldado en la nube: ante cualquier queja vecinal existe evidencia horaria objetiva.
- Ronda trimestral de verificación en linderos y auditoría anual del sellado del limitador.
- Protocolo de convivencia: canal directo de contacto vecinal y compromiso público de la terraza (cierre 18:00, sin música exterior — zona `az-terraza`).

**Conclusión:** el conjunto tierra + masa + box-in-box convierte el mayor riesgo del proyecto en su ventaja competitiva más difícil de copiar: ningún local convencional de Arequipa puede ofrecer 115 dB(A) de pista con silencio normativo en la vereda.
