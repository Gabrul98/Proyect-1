# 02 · Arquitectura — Memoria Descriptiva

Proyecto C-4 · Cuesta de Cayma N°4, Cayma, Arequipa

---

## 1. Partido arquitectónico

**El descenso como ritual.** El proyecto organiza toda su arquitectura alrededor de una secuencia: calle → bahía drop-off (6 pasos bajo la marquesina) → café iluminado → recepción con un solo haz cenital sobre una puerta de acero → esclusa acústica en silencio total → escalera escenográfica → lounge, donde por primera vez se ve la pista 7 m más abajo. Cada umbral filtra, comprime y prepara. El edificio no tiene un lobby: tiene una liturgia.

**El vacío telescópico de La Catedral.** Los tres sótanos se perforan con un vacío que se ensancha al descender —hueco de ~52 m² en S−1, ~62 m² en S−2— hasta liberar sobre la pista una altura de ~9.6 m en un lote de 9.74 m de frente: una nave subterránea de proporción vertical inversa a la del lote. Todo el club mira a ese vacío: el balcón de pie en S−1, los 7 boxes del mezzanine en S−2, la cabina en voladizo frente al muro LED de 6 × 6.5 m.

**El patio de luz como eco superior del vacío.** Sobre rasante, un patio de ~30 m² (entre z 19 y z 25) perfora P1, P2, P3 y la azotea con un jardín vertical de flora altoandina. Está **alineado en planta con el vacío de La Catedral, 10 m más abajo**: el mismo gesto —un hueco que atraviesa el edificio— aparece dos veces, uno lleno de luz natural y otro de luz escénica. El patio además aporta el área libre normativa, y ventila e ilumina los tres pisos.

**Geometría del lote como material.** El acuñamiento del lindero este (de 9.74 a 6.57 m en 37 m de fondo) se absorbe en las zonas de servicio y backstage, dejando ortogonales las zonas nobles. La losa tipo de sótano arranca en z = 3.0 (tras el retiro frontal) y remata en z = 34.0; las plantas altas rematan en z = 32.0 (P1–P2) y z = 28.0 (P3 y azotea), escalonando el volumen hacia el Pasaje Peatonal.

## 2. Cuadro de áreas por nivel y por zona

Fuente: modelo de datos del proyecto (`web/data/levels.js`). Las áreas de zona son útiles de programa; la diferencia con el área de planta corresponde a circulaciones, muros y núcleo.

### Sobre rasante — 601 m² techados (coeficiente 2.01)

| Nivel | Cota | Zona | m² | Aforo |
|---|---|---|---|---|
| **P1 — Café & la puerta discreta** (210 m² techados) | ±0.00 | Café de especialidad | 78 | 40 |
| | | Recepción & puerta discreta | 28 | 15 |
| | | Galería del patio | 12 | 8 |
| | | Cocina de apoyo & baños | 40 | 8 |
| | | *Patio de luz (exterior, área libre)* | *30* | — |
| | | *Bahía drop-off (exterior, retiro frontal)* | *27* | — |
| **P2 — Restaurante day-to-night** (210 m² techados) | +3.40 | Cava & barra del restaurante | 25 | 12 |
| | | Comedor principal | 85 | 70 |
| | | Comedor del patio | 12 | 10 |
| | | Cocina principal | 40 | 10 |
| **P3 — Salones & membresías** (181 m² techados) | +6.80 | Private dining | 32 | 16 |
| | | Salones VIP día / eventos | 70 | 60 |
| | | Oficina & CRM de membresías | 14 | 8 |
| **Azotea** (no techada, no computa) | +10.20 | Terraza de brunch (solo día) | 78 | 45 |
| | | Planta técnica (tras pantalla acústica) | 55 | 2 |

### Bajo rasante — 759 m² (3 × ~253 m², no computan coeficiente)

| Nivel | Cota | Zona | m² | Aforo |
|---|---|---|---|---|
| **S−1 — Lounge & El Secreto** | −3.50 | Esclusa & guardarropa | 10 | 8 |
| | | Lounge — Antesala | 30 | 50 |
| | | Balcón al vacío | 31 | 40 |
| | | Baños lounge | 9 | 6 |
| | | Camerino de artistas | 6 | 6 |
| | | El Secreto (speakeasy) | 36 | 35 |
| **S−2 — Mezzanine VIP** | −7.00 | Boxes VIP — Galería Oeste (4 boxes) | 32 | 40 |
| | | Boxes VIP — Palco Frontal (3 boxes) | 20 | 30 |
| | | Cabina DJ — El Púlpito | 10 | 6 |
| | | Barra de servicio VIP (ciega) | 9 | 4 |
| | | Baños VIP | 22 | 10 |
| | | Apoyo & bodega VIP | 15 | 4 |
| **S−3 — La Catedral** | −10.50 | Pista — La Catedral | 86 | 120 |
| | | Barra principal (sillar, 7.5 m) | 20 | 30 |
| | | Baños generales | 24 | 12 |
| | | Backstage & sala técnica | 30 | 8 |

**Aforos de diseño:** club **350** (pista 120 + boxes 70 + lounge y balcón 90 + speakeasy 35 + 35 de circulación y barras) · diurno **110** (café 40 + restaurante 70).

## 3. Alturas y cotas

| Nivel | Cota de piso terminado | Altura libre | Observación |
|---|---|---|---|
| Azotea | +10.20 | — (abierto) | Parapeto/baranda 1.2 m; pantalla técnica h 2.4 m |
| P3 | +6.80 | 3.05 m | |
| P2 | +3.40 | 3.05 m | |
| P1 | ±0.00 | 3.05 m | Nivel de vereda (Calle Cacique Alpaca) |
| S−1 | −3.50 | 2.80 m | Compresión deliberada antes del vacío |
| S−2 | −7.00 | 3.15 m | |
| S−3 | −10.50 | 3.40 m bajo mezzanine; **~9.6 m sobre la pista** (vacío hasta el fondo de la losa de S−1) | |

Losas de 0.35 m bajo cada cota de piso terminado. Fondo de excavación ~−10.9 m.

## 4. Circulaciones

| Circulación | Recorrido | Carácter |
|---|---|---|
| **Núcleo oeste** (x 0.3–2.8, z 3–8) | Escalera + **ascensor a los 7 niveles** (S−3 a azotea) | Circulación vertical principal y primera ruta de evacuación; núcleo de muros de 0.20 m junto al lindero oeste, presente en la misma posición en todas las plantas |
| **Escalera escenográfica** | Recepción P1 (z 13.4–15) → esclusa → lounge S−1 | La entrada ceremonial al club; solo bajada de público |
| **Escalera del vacío** (lado este, z 8.3–10.7) | S−1 → S−2 → S−3, adosada al borde del vacío | Descenso escénico con vista continua a la pista |
| **Ruta de artistas** | Camerino (S−1) → cabina El Púlpito (S−2), acceso propio | Los artistas nunca cruzan público |
| **Ruta de servicio y evacuación posterior** | Escalera posterior + montacargas por backstage (S−3), bodega VIP (S−2) y zona de servicio (P1) → **salida al Pasaje Peatonal** por el retiro posterior | Logística (cocina P2 con montaplatos a S−1/S−2) y segunda ruta de evacuación |

## 5. Estructura

- **Contención:** muros pantalla anclados perimetrales para una excavación de ~10.9 m entre medianeras, con **calzaduras por etapas** de las edificaciones colindantes, en el suelo volcánico de Cayma (tufos y depósitos de la quebrada San Jacinto — capacidad portante favorable, verificada por estudio de suelos con ensayos específicos). Monitoreo topográfico de colindantes durante toda la excavación.
- **Superestructura:** pórticos y muros de concreto armado con **losas postensadas**, que permiten salvar el vacío de la Catedral y los huecos del patio sin vigas descolgadas que castiguen las alturas libres.
- **Voladizos singulares:** cabina El Púlpito en voladizo sobre la pista (S−2) y bordes de mezzanine con barandas de vidrio acústico estructural.
- **Junta acústica box-in-box:** el volumen del club (S−1 a S−3) es una caja interior estructuralmente desolidarizada — losa de pista flotante sobre apoyos elastoméricos, muros interiores autoportantes y cielos suspendidos con amortiguadores — separada de los muros pantalla y de la estructura del edificio diurno. Ninguna vibración de la pista llega a la medianera ni a la fachada.

## 6. Fachada

Composición en tres actos sobre los 9.74 m de frente:

1. **Basamento pétreo:** sillar de cantera local en aparejo contemporáneo, coherente con el perfil del pueblo tradicional de Cayma (condición del Ambiente Urbano Monumental).
2. **La vitrina del café:** el único gesto abierto — carpintería de acero negro de piso a cielo en P1, que muestra la vida diurna del café y legitima el edificio ante el barrio. Encima, ventanas verticales profundas para P2 y P3.
3. **La puerta escultórica:** una pieza de acero negro (1.2 × 2.6 m) con el único símbolo del club, sin manija visible, iluminada por un solo haz. No hay letrero, no hay publicidad luminosa; el único rótulo del edificio es el del café.

De noche, la marquesina de la bahía drop-off proyecta luz ámbar tenue sobre el retiro frontal: la fachada permanece en silencio visual y acústico (inmisión ≤ 50 dB(A)).

## 7. Accesibilidad

- **Ascensor a los 7 niveles** en el núcleo oeste: toda persona puede llegar a cualquier zona pública del edificio, incluida La Catedral, sin usar escaleras.
- **Baños accesibles:** 2 cubículos accesibles en los baños generales de S−3; servicios adaptados en los niveles diurnos.
- Recorridos sin desniveles dentro de cada planta; bahía drop-off a nivel de vereda con embarque directo.

## 8. Evacuación (RNE A.100 y A.130)

**Estrategia:** dos rutas de evacuación independientes desde todos los niveles.

| Ruta | Ubicación | Descarga |
|---|---|---|
| 1 — Núcleo oeste | x 0.3–2.8, z 3–8, presente en los 7 niveles | Calle Cacique Alpaca (retiro frontal) |
| 2 — Escalera posterior | Zona de servicio/backstage, junto al lindero posterior | Pasaje Peatonal (retiro posterior) |

**Dimensionamiento (aforo crítico nocturno, 350 personas en sótanos):**

- Ancho requerido de escaleras (A.130: 0.008 m/persona): 350 × 0.008 = **2.80 m totales** → dos escaleras de **1.40 m** de ancho libre cada una (≥ mínimo normativo de 1.20 m). La condición A.130 de que, anulada una escalera, la restante mantenga capacidad se cubre con la holgura de ancho y el escalonamiento de la evacuación por niveles.
- Ancho requerido de puertas y pasajes (0.005 m/persona): 350 × 0.005 = 1.75 m agregados; todas las puertas de evacuación son de 1.00 m mínimo por hoja, con barra antipánico y giro en el sentido de la evacuación.
- **Distancias de recorrido < 45 m** desde cualquier punto ocupable hasta una escalera de evacuación (planta de ~9.5 × 31 m con dos escaleras en extremos opuestos: recorrido máximo real ~30 m).
- **Escaleras presurizadas** (evacuación desde sótanos): cajas cerradas cortafuego con vestíbulo previo e inyección mecánica de presurización, señalización fotoluminiscente y alumbrado de emergencia autónomo.
- Las puertas acústicas de la esclusa (S−1) cuentan con retenedores electromagnéticos conectados al sistema de alarma: en emergencia quedan francas y la ruta 1 opera sin obstáculos.
- Control de aforo en tiempo real (conteo en puerta y por nivel) como condición de la certificación ITSE/INDECI: aforo club 350, aforo diurno 110.

**Verificación por nivel (ocupación máxima simultánea vs. dos salidas):** el nivel más cargado es S−3 (170 personas entre pista, barra, baños y backstage), servido por la escalera del vacío hacia S−2/S−1 más las dos rutas protegidas; ningún punto del nivel dista más de 30 m de una salida protegida. Los niveles diurnos (máx. 110 personas repartidas en P1–P3) evacúan con holgura amplia por las mismas dos rutas.
