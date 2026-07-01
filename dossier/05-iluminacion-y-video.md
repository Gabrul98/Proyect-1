# 05 · Iluminación y Video

Proyecto C-4 · Cuesta de Cayma N°4, Cayma, Arequipa

---

## 5.1 Filosofía de diseño: la oscuridad como lujo

En el C-4 la luz se administra como el alcohol: poca, buena y en el momento exacto. La paleta de casa es **ámbar (2200 K, bajando a 2000 K en El Secreto) + blanco**, sobre una base de penumbra real. El RGB saturado existe **solo en la pista y solo durante el show**; en lounge, boxes, speakeasy y niveles diurnos está prohibido por diseño. Nada de luz fría, nada de pantallas fuera de la pista (El Secreto es explícitamente *cero pantallas*), ningún letrero luminoso al exterior: el único resplandor que ve la calle es la marquesina ámbar tenue del drop-off y el letrero del café.

Tres capas conviven sin mezclarse:

1. **Espectáculo** (La Catedral y su vacío): kinetic array, moving heads, láseres, strobes, muro LED — control grandMA3.
2. **Arquitectónica** (lounge, boxes, speakeasy, barras, circulaciones): ámbar oculto en el sillar, escenas fijas y cues de ritual — DMX/DALI desde el mismo sistema.
3. **Diurna** (café, restaurante, salones, terraza): DALI con escenas por horario, luz natural del patio como protagonista.

## 5.2 La Catedral — el techo respira

### Kinetic array (la pieza icónica)

- **24 winches DMX con esferas LED** (motores de elevación tipo kinetic lights, ~0.2 m/s, recorrido útil ~7 m) suspendidos en retícula 4×6 sobre la pista de 86 m², colgados de la subestructura del vacío (anclajes previstos en la losa técnica, zona `s3-pista`).
- Cada esfera: LED RGBW direccionable, ~50 W. El conjunto sube, baja y ondula en sincronía con el show: **el techo de La Catedral "respira"** — plano de nubes a +9 m en la entrada del público, descendiendo hasta +3.5 m sobre las cabezas en los drops.
- Seguridad: cada winche con freno autoblocante, doble sujeción (safety secundario), célula de carga y zona de exclusión programada sobre las barandas del vacío. Mantenimiento desde pasarela técnica del vacío.

### Fixtures de espectáculo

| Fixture | Cant. | Ubicación | Rol |
|---|---|---|---|
| Kinetic winch + esfera LED RGBW | 24 | Retícula sobre pista | El techo que respira |
| Moving head beam/spot LED (~350 W) | 12 | Frentes de losa S−2/S−1 del vacío + torres del muro LED | Haces a través de los 9.6 m del vacío |
| Moving head wash LED (~450 W) | 8 | Perímetro del vacío y mezzanine | Color de masa sobre pista y boxes |
| Láser RGB full-color (10–15 W ópticos) | 2 | Puntos altos del vacío, ejes cruzados | Planos y túneles a través del vacío |
| Strobe LED (~1,000 W pico) | 6 | Canto de losa del mezzanine | Puntuación de drops |
| Blinder LED 2-lite ámbar (~200 W) | 4 | Fascia de El Púlpito hacia pista | El "golpe de cara" del clímax, y el DJ ve a su público |
| Seguidor cenital tenue | 1 | Sobre la cabina | Presencia del DJ sin romper la penumbra |

### Seguridad láser (audience scanning)

Los 2 láseres operan bajo protocolo de **exposición de audiencia escaneada** conforme IEC 60825-1 / directrices ILDA: cálculo de MPE por zona, **zonas de seguridad definidas por software** (proyección solo sobre el vacío y por encima de +2.6 m del nivel de pista y de las barandas del mezzanine/balcón), obturadores de seguridad redundantes, detector de fallo de escaneo con corte < 20 ms, llave física y operador acreditado en cada show con láser activo. Los planos de zonas de exclusión forman parte del expediente ITSE.

## 5.3 Muro LED y video

- **Muro LED de 6.0 × 6.5 m (39 m²), pixel pitch 2.6 mm**, detrás de El Púlpito (prop `muroLED`: x 1.2→7.2 m, cotas −10.3→−3.8 m — ocupa casi toda la altura del vacío). Resolución ≈ **2,300 × 2,500 px** (~5.75 Mpx), brillo calibrado 800–1,200 nits (es un club, no un estadio: el muro trabaja habitualmente al 15–30 % con contenido de negros profundos), tasa de refresco ≥ 3,840 Hz (sin flicker en cámara: todo lo que pasa ahí se filma).
- Estructura propia anclada al muro de 30 cm de backstage, con acceso posterior para mantenimiento; procesadores de video (2, principal + respaldo) en la sala técnica S−3 (`s3-backstage`).
- **Cinta LED de fascia** en la baranda del mezzanine (perímetro del vacío, ~35 m lineales, pixel-mapeada de baja resolución): subraya la geometría telescópica del vacío y extiende el contenido del muro sin convertir el club en una pantalla.
- **Red de video:** servidor de medios de 4 salidas (tipo media server de show con timecode) + **NDI** sobre red de video dedicada de 10 Gb para contenido generativo, cámaras IP de show y feeds de VJ invitado (punto de conexión en cabina). El contenido de casa es generativo y monocromo-ámbar la mayor parte de la noche; el color pleno se reserva para los sets principales.

## 5.4 Iluminación arquitectónica — ámbar sobre sillar

- **Cintas LED 2200 K ocultas** en juntas y celosías de sillar, bajo encimeras de barra (barras emisivas de S−3, S−2, S−1 y P1–P2), en repisas del balcón y en la fascia de boxes: la piedra parece iluminada desde adentro. Ninguna fuente vista.
- **Uplights** rasantes en los muros de sillar del lounge y la escalera escenográfica; un solo haz cenital sobre la puerta de acero de recepción (`p1-recepcion`), tal como manda el guion de llegada.
- **El Secreto:** velas reales normadas + cintas 2000 K a intensidad mínima; cero pantallas, cero fixtures vistos.
- **Escenas por box (mezzanine):** cada uno de los 7 boxes tiene su propia escena DMX; el **ritual de botella** dispara desde la tablet del host un cue sincronizado (pulso ámbar sobre el box + acento del kinetic más cercano + destello de fascia) — teatro de 20 segundos visible desde toda La Catedral, sin bengalas ni fuego.
- Baños: luz cálida 2200 K a intensidad mínima normativa, espejos retroiluminados (la "zona selfie" controlada de S−3).

## 5.5 Control, haze y detección de incendios

- **Consola grandMA3 compact XT** en posición de control junto a El Púlpito + nodo de respaldo en sala técnica; universos vía red MA-Net/sACN sobre fibra entre niveles.
- **Timecode (LTC/MTC) para los shows residentes:** los sets de apertura y los momentos-firma (la "respiración" del kinetic, el ritual de medianoche) corren sincronizados a línea de tiempo con el media server; el resto de la noche se opera en vivo (busking) por el LJ de casa.
- **Haze:** 2 máquinas de haze de bajo residuo (~1.5 kW c/u) junto a la cabina y bajo el mezzanine, con gestión DMX y ventilación coordinada.
- **Compatibilidad con detección de incendios:** el vacío y la pista se protegen con **detección por aspiración (ASD)** multi-nivel con algoritmos de discriminación de partículas, calibrada en commissioning con el haze operando — cero falsas alarmas sin perder detección real. Interlock: alarma confirmada → corte de haze y láseres, luz de evacuación al 100 % (blanco 3000 K, el único momento de luz fría del club), audio atenuado con mensaje de evacuación (integración con el P1, cap. 04).

## 5.6 Niveles diurnos — escenas DALI

| Nivel | Sistema | Escenas |
|---|---|---|
| Café P1 (`p1-cafe`) | DALI-2, downlights + cintas 2700 K | Mañana (natural dominante) / mediodía neutro / noche cálida |
| Restaurante P2 (`p2-comedor`) | DALI-2 | **Mediodía neutro → cena 2400 K → 23:00 noche ámbar teatral** (transición day-to-night automatizada por reloj astronómico + disparo manual del gerente) |
| Cava P2 | DALI + cinta ámbar | Cava retroiluminada permanente |
| Salones P3 | DALI + DMX puente | Presentación (4000 K, 500 lx) / cóctel / fiesta privada (hereda el lenguaje del club) |
| Patio de luz | Uplight vegetal tenue | Solo noche, jardín altoandino |
| Terraza azotea | Guirnalda cálida baja intensidad | Solo hasta 18:00 en invierno; sin iluminación de evento |
| Drop-off | Marquesina ámbar tenue | Única luz exterior del proyecto junto al letrero del café |

## 5.7 Tabla de consumo eléctrico estimado

| Partida | Cant. | Potencia unit. | Conectada | Demanda típica de show |
|---|---|---|---|---|
| Kinetic winches + esferas | 24 | 200 W | 4.8 kW | 2.5 kW |
| Beam/spot | 12 | 350 W | 4.2 kW | 2.5 kW |
| Wash | 8 | 450 W | 3.6 kW | 2.2 kW |
| Láseres RGB | 2 | 800 W | 1.6 kW | 1.0 kW |
| Strobes LED | 6 | 1,000 W pico | 6.0 kW | 1.0 kW (duty bajo) |
| Blinders + seguidor | 5 | 200–300 W | 1.2 kW | 0.4 kW |
| Muro LED 39 m² P2.6 | 1 | 600 W/m² máx | 23.4 kW | 7–9 kW (contenido oscuro) |
| Cinta fascia + arquitectónica club | — | — | 4.5 kW | 2.5 kW |
| Haze | 2 | 1,500 W | 3.0 kW | 1.5 kW |
| Control, media server, red video | — | — | 2.5 kW | 2.0 kW |
| Iluminación diurna P1–P3 (DALI) | — | — | 6.0 kW | 3.0 kW |
| **Total iluminación + video** | | | **~61 kW conectados** | **~25–27 kW típicos** |

Alimentadores dedicados desde el tablero del club (S−3) con DPX por partida; strobes y muro LED en circuitos independientes (picos no simultáneos por programación); todo el rig LED — sin lámparas de descarga — mantiene la carga térmica baja para el HVAC del vacío.

## 5.8 Presupuesto de la partida (dentro de USD 1.0 M técnico)

| Partida | Estimado (USD) |
|---|---|
| Kinetic array (24 winches + esferas + control) | 95,000 |
| Moving heads, strobes, blinders, seguidor | 110,000 |
| Láseres + sistema de seguridad de audiencia | 32,000 |
| Iluminación arquitectónica club (cintas, uplights, escenas box) | 48,000 |
| Control grandMA3 compact XT + nodos + fibra | 55,000 |
| Muro LED 39 m² P2.6 + procesadores + estructura | 120,000 |
| Media server, NDI, cinta fascia, cámaras de show | 45,000 |
| DALI niveles diurnos + integración BMS | 35,000 |
| Instalación, rigging certificado, commissioning (incl. calibración ASD/haze) | 35,000 |
| **Subtotal iluminación + video + control** | **575,000** |

Sumado al subtotal de sonido (USD 425,000, cap. 04), el paquete técnico completo cierra en **~USD 1.0 M**, dentro del CAPEX de USD 3.4 M.
