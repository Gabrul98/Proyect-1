// =====================================================================
// FUENTE ÚNICA DE VERDAD — Proyecto C-4 (club sin nombre)
// Cuesta de Cayma N°4, Quebrada San Jacinto, Cayma, Arequipa
// Lote: 298.36 m² — frente 9.74 m (Calle Cacique Alpaca),
// fondo ~37 m (remata en Pasaje Peatonal), ancho posterior 6.57 m.
// Convención: 1 unidad = 1 m. X = ancho del lote (0 = lindero oeste),
// Z = fondo (0 = línea de fachada sobre Cacique Alpaca), Y = altura
// (nivel de vereda = 0). El lindero este es el que se acuña:
// ancho(z) = 9.74 − 0.0857·z
// =====================================================================

export const LOT = {
  frente: 9.74,
  fondo: 37.0,
  anchoPosterior: 6.57,
  area: 298.36,
  perimetro: 89.82,
  // ancho del lote a una profundidad z
  ancho(z) { return 9.74 - ((9.74 - 6.57) / 37.0) * z; },
  poligono: [[0, 0], [9.74, 0], [6.57, 37], [0, 37]],
};

export const PROYECTO = {
  codigo: 'C-4',
  nombre: 'Proyecto C-4 — club sin nombre',
  distrito: 'Cayma, Arequipa',
  normativa: 'ZRE-CH · máx. 3 pisos · coef. 2.1 · área libre 30 %',
  areaTechada: 601,     // m² sobre rasante (P1 210 + P2 210 + P3 181)
  areaSotanos: 759,     // m² bajo rasante (3 × ~253)
  areaLibre: 91.5,      // m² (30.7 % ≥ 30 % exigido)
  aforoClub: 350,       // pista 120 + boxes 70 + lounge 90 + speakeasy 35 + circulación
  aforoDia: 110,        // café 40 + restaurante 70
  capexUSD: 3400000,
};

export const SPAWN = { nivel: 'p1', pos: [4.8, 5.5], yaw: Math.PI }; // dentro del café, mirando hacia la recepción

// ---------------------------------------------------------------------
// NIVELES — elev = cota Y del piso terminado; losa de 0.35 m bajo elev.
// `losa.contorno` es el perímetro construido del nivel; `losa.huecos`
// son vacíos (triple altura de la sala, patio de luz).
// `muros`: segmentos {p1,p2,espesor,altura}. Perímetro se genera solo.
// `zonas`: tiles clicables con ficha técnica (alimentan también dossier).
// ---------------------------------------------------------------------

export const LEVELS = [
  // ================= SÓTANO -3 · LA CATEDRAL =================
  {
    id: 's3',
    nombre: 'Sótano −3 · La Catedral',
    orden: 0,
    elev: -10.5,
    alturaLibre: 3.4, // bajo mezzanine; sobre la pista el vacío llega a ~9.6 m
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [6.83, 34.0], [0.0, 34.0]],
      huecos: [],
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.4 },   // núcleo
      { p1: [0.0, 8.0], p2: [1.0, 8.0], espesor: 0.20, altura: 3.4 },   // núcleo (vano x 1.0–2.2)
      { p1: [2.2, 8.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.4 },
      { p1: [1.0, 28.5], p2: [7.3, 28.5], espesor: 0.30, altura: 10.0 }, // muro LED / backstage
      { p1: [1.0, 31.5], p2: [6.9, 31.5], espesor: 0.20, altura: 3.4 },
    ],
    zonas: [
      {
        id: 's3-pista', nombre: 'Pista — La Catedral',
        poligono: [[1.2, 11.0], [7.4, 11.0], [7.3, 25.0], [1.2, 25.0]],
        color: 0xf5a623,
        ficha: {
          m2: 86, aforo: 120,
          descripcion: 'Corazón del club: pista bajo un vacío de ~9.6 m que atraviesa los tres sótanos. Losa flotante sobre apoyos elastoméricos (box-in-box). Piso técnico con anclajes para escenografía y kinetic lights.',
          sonido: '4 cuelgues L-Acoustics A10i (2 por punto) + arco cardioide de 4× KS28 bajo la cabina. SPL objetivo 112–115 dB(A) homogéneo. Calibración P1/M1.',
          luces: 'Kinetic array de 24 winches con esferas LED sobre la pista, 12 beam/spot + 8 wash, 2 láseres RGB, control grandMA3 con timecode.',
        },
      },
      {
        id: 's3-barra', nombre: 'Barra principal',
        poligono: [[1.0, 8.2], [8.9, 8.2], [8.7, 10.8], [1.0, 10.8]],
        color: 0xd98e2b,
        ficha: {
          m2: 20, aforo: 30,
          descripcion: 'Barra escenográfica de 7.5 m tallada en sillar retroiluminado, frente a la pista y bajo el borde del mezzanine. 4 estaciones POS cashless, hielera de flujo continuo y espalda de barra en vitrina-museo.',
          sonido: 'Zona con delay fills 2× X8 alineados al sistema principal.',
          luces: 'Cinta LED bajo encimera y retroiluminación ámbar del sillar; luz de tarea oculta para bartenders.',
        },
      },
      {
        id: 's3-banos', nombre: 'Baños generales',
        poligono: [[3.4, 3.4], [9.3, 3.4], [9.2, 7.6], [3.4, 7.6]],
        color: 0x8a8f98,
        ficha: {
          m2: 24, aforo: 12,
          descripcion: '6 cubículos unisex + 2 accesibles, lavamanos monolítico de piedra volcánica con espejo retroiluminado (zona selfie controlada). Posición estratégica: se regresa a la pista pasando frente a la barra.',
          sonido: 'Programa musical propio a bajo nivel (2× X4i).',
          luces: 'Luz cálida 2200 K, intensidad mínima normativa.',
        },
      },
      {
        id: 's3-backstage', nombre: 'Backstage & sala técnica',
        poligono: [[1.0, 28.8], [7.25, 28.8], [6.85, 33.6], [1.0, 33.6]],
        color: 0x5f6672,
        ficha: {
          m2: 30, aforo: 8,
          descripcion: 'Sala de amplificación (racks LA4X/LA12X ventilados), tablero eléctrico del club, UPS, bodega de barra con montacargas y acceso a la escalera de evacuación posterior (salida al Pasaje Peatonal).',
          sonido: 'Racks de amplificación con monitoreo remoto Milan/AVB.',
          luces: 'Dimmers y procesamiento de video del muro LED.',
        },
      },
    ],
    props: [
      { tipo: 'barra', box: [[1.2, 8.6, 0], [8.6, 9.6, 1.1]], material: 'barraEmisiva' },
      { tipo: 'muroLED', plano: { x1: 1.2, x2: 7.2, z: 28.55, y1: -10.3, y2: -3.8 }, material: 'muroLED' },
      { tipo: 'cabinaBase', box: [[3.0, 25.6, 0], [6.4, 28.3, 3.4]], material: 'murosBase' },
    ],
    lightAnchors: [
      { pos: [2.5, -8.0, 13], tipo: 'sweep' }, { pos: [6.5, -8.0, 13], tipo: 'sweep' },
      { pos: [4.5, -7.0, 18], tipo: 'pulse' }, { pos: [2.5, -8.0, 23], tipo: 'strobe' },
      { pos: [6.5, -8.0, 23], tipo: 'sweep' }, { pos: [4.5, -9.6, 9.5], tipo: 'pulse' },
    ],
  },

  // ================= SÓTANO -2 · MEZZANINE VIP =================
  {
    id: 's2',
    nombre: 'Sótano −2 · Mezzanine VIP',
    orden: 1,
    elev: -7.0,
    alturaLibre: 3.15,
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [6.83, 34.0], [0.0, 34.0]],
      huecos: [[[2.8, 11.0], [7.25, 11.0], [7.2, 25.0], [2.8, 25.0]]], // vacío sobre la pista
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.15 },  // núcleo
      { p1: [0.0, 8.0], p2: [1.0, 8.0], espesor: 0.20, altura: 3.15 },  // núcleo (vano x 1.0–2.2)
      { p1: [2.2, 8.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.15 },
      { p1: [0.0, 31.0], p2: [7.0, 31.0], espesor: 0.20, altura: 3.15 },
    ],
    zonas: [
      {
        id: 's2-boxes-oeste', nombre: 'Boxes VIP — Galería Oeste',
        poligono: [[0.3, 11.0], [2.6, 11.0], [2.6, 25.0], [0.3, 25.0]],
        color: 0xf5a623,
        ficha: {
          m2: 32, aforo: 40,
          descripcion: '4 boxes de 8–10 personas asomados al vacío de La Catedral, cada uno con sofá curvo, mesa fría iluminada y host dedicado. Baranda de vidrio acústico con pasamanos de bronce. Reserva solo por referido interno.',
          sonido: 'Fills dedicados 4× X8 con nivel −6 dB vs. pista: se conversa sin gritar.',
          luces: 'Escena propia por box (DMX): el ritual de botella dispara un cue sincronizado de luz sobre el box.',
        },
      },
      {
        id: 's2-boxes-frente', nombre: 'Boxes VIP — Palco Frontal',
        poligono: [[0.3, 8.3], [9.0, 8.3], [8.9, 10.7], [0.3, 10.7]],
        color: 0xf5a623,
        ficha: {
          m2: 20, aforo: 30,
          descripcion: '3 boxes premium frente a frente con la cabina, al otro lado del vacío: la mejor vista del club. Ticket mínimo más alto de la casa.',
          sonido: 'Cobertura directa del sistema principal + fill de proximidad.',
          luces: 'Bañados por el reflejo del muro LED; cinta ámbar en fascia.',
        },
      },
      {
        id: 's2-cabina', nombre: 'Cabina DJ — El Púlpito',
        poligono: [[3.0, 25.3], [6.4, 25.3], [6.4, 28.2], [3.0, 28.2]],
        color: 0xffffff,
        ficha: {
          m2: 10, aforo: 6,
          descripcion: 'Cabina en voladizo sobre la pista (−7.0 m), de espaldas al muro LED de 6×6.5 m: el DJ oficia hacia la catedral. Acceso propio desde camerino (S−1) sin cruzar público.',
          sonido: 'Monitores 2× X12 + sub KS21, mixer a elección del artista (booth rider ready), aislamiento antivibración.',
          luces: 'Blinders hacia pista, seguidor cenital tenue sobre el DJ; control de humo/haze junto a la cabina.',
        },
      },
      {
        id: 's2-barra-vip', nombre: 'Barra de servicio VIP',
        poligono: [[3.2, 3.4], [5.4, 3.4], [5.4, 7.6], [3.2, 7.6]],
        color: 0xd98e2b,
        ficha: {
          m2: 9, aforo: 4,
          descripcion: 'Barra ciega (solo mozos) que alimenta los 7 boxes: nadie del mezzanine baja por su bebida. Estación de rituales de botella, cava fría y POS dedicado.',
          sonido: 'Zona técnica, monitoreo del programa.',
          luces: 'Luz de trabajo neutra oculta.',
        },
      },
      {
        id: 's2-banos-vip', nombre: 'Baños VIP',
        poligono: [[5.7, 3.4], [9.3, 3.4], [9.2, 7.6], [5.7, 7.6]],
        color: 0x8a8f98,
        ficha: {
          m2: 22, aforo: 10,
          descripcion: '4 cubículos + tocador con amenities de autor y atención personal. Exclusivo del nivel mezzanine.',
          sonido: 'Programa propio a bajo nivel.',
          luces: 'Luz cálida de tocador, espejos retroiluminados.',
        },
      },
      {
        id: 's2-boh', nombre: 'Apoyo & bodega VIP',
        poligono: [[0.3, 31.3], [6.9, 31.3], [6.85, 33.6], [0.3, 33.6]],
        color: 0x5f6672,
        ficha: {
          m2: 15, aforo: 4,
          descripcion: 'Bodega de vinos y destilados premium, preparación de mesas frías, montacargas y escalera de evacuación posterior.',
          sonido: '—', luces: 'Luz de trabajo.',
        },
      },
    ],
    props: [
      { tipo: 'baranda', segmentos: [
        { p1: [2.8, 11.0], p2: [2.8, 25.0] }, { p1: [2.8, 11.0], p2: [7.25, 11.0] },
        { p1: [7.25, 11.0], p2: [7.2, 25.0] }, { p1: [2.8, 25.0], p2: [7.2, 25.0] },
      ], material: 'vidrioBaranda' },
      { tipo: 'barra', box: [[3.4, 4.2, 0], [4.4, 7.2, 1.1]], material: 'barraEmisiva' },
      { tipo: 'cabinaFront', box: [[3.0, 25.15, 0.0], [6.4, 25.45, 1.15]], material: 'barraEmisiva' },
    ],
    lightAnchors: [
      { pos: [1.4, -5.2, 18], tipo: 'pulse' }, { pos: [4.7, -5.0, 26.7], tipo: 'pulse' },
      { pos: [4.5, -5.2, 9.5], tipo: 'sweep' },
    ],
  },

  // ================= SÓTANO -1 · LOUNGE & EL SECRETO =================
  {
    id: 's1',
    nombre: 'Sótano −1 · Lounge & El Secreto',
    orden: 2,
    elev: -3.5,
    alturaLibre: 2.8,
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [6.83, 34.0], [0.0, 34.0]],
      huecos: [[[3.0, 12.0], [7.15, 12.0], [7.1, 24.5], [3.0, 24.5]]], // vacío telescópico
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 2.8 },   // núcleo
      { p1: [5.5, 3.0], p2: [5.5, 8.0], espesor: 0.20, altura: 2.8 },   // esclusa
      { p1: [2.0, 24.7], p2: [3.0, 24.7], espesor: 0.15, altura: 2.8 },  // vano x 0–2.0 a baños
      { p1: [0.0, 27.5], p2: [5.6, 27.5], espesor: 0.25, altura: 2.8 },  // muro pivotante (speakeasy)
      { p1: [6.5, 27.5], p2: [7.35, 27.5], espesor: 0.25, altura: 2.8 }, // — abertura secreta x 5.6–6.5
      { p1: [4.6, 24.7], p2: [4.6, 27.5], espesor: 0.15, altura: 2.8 },
    ],
    zonas: [
      {
        id: 's1-esclusa', nombre: 'Esclusa & guardarropa',
        poligono: [[3.0, 3.4], [5.3, 3.4], [5.3, 7.6], [3.0, 7.6]],
        color: 0x8a8f98,
        ficha: {
          m2: 10, aforo: 8,
          descripcion: 'Doble puerta acústica en cascada (vestíbulo de 45 dB de atenuación): el sonido del club no existe hasta cruzar la segunda hoja. Guardarropa con ticket digital.',
          sonido: 'Silencio deliberado: la transición es parte del ritual.',
          luces: 'Túnel de luz ámbar puntual, casi teatral.',
        },
      },
      {
        id: 's1-lounge', nombre: 'Lounge — Antesala',
        poligono: [[0.3, 8.3], [9.0, 8.3], [8.95, 11.7], [0.3, 11.7]],
        color: 0xf5a623,
        ficha: {
          m2: 30, aforo: 50,
          descripcion: 'Primer contacto con el vacío: desde aquí se ve la pista 7 m más abajo. Sofás bajos, mesas de coctelería y la barra del lounge. Música propia (house/afro a 95 dB máx.) independiente de la pista.',
          sonido: 'Sistema zonal 6× X6 + 2× SB15, programa musical propio.',
          luces: 'Ámbar incandescente, velas LED, cero luz fría.',
        },
      },
      {
        id: 's1-balcon', nombre: 'Balcón al vacío',
        poligono: [[0.3, 12.0], [2.8, 12.0], [2.8, 24.5], [0.3, 24.5]],
        color: 0xd98e2b,
        ficha: {
          m2: 31, aforo: 40,
          descripcion: 'Galería de pie con baranda de vidrio sobre La Catedral: el mirador del club. Repisas de apoyo para copas a lo largo de la baranda (consumo sin mesa).',
          sonido: 'Se escucha la pista con 8–10 dB menos: zona de conversación.',
          luces: 'Resplandor del kinetic array y del muro LED desde abajo.',
        },
      },
      {
        id: 's1-banos', nombre: 'Baños lounge',
        poligono: [[0.3, 25.0], [4.4, 25.0], [4.4, 27.2], [0.3, 27.2]],
        color: 0x8a8f98,
        ficha: {
          m2: 9, aforo: 6,
          descripcion: '3 cubículos + tocador para lounge y speakeasy.',
          sonido: 'Programa propio.', luces: 'Cálida 2200 K.',
        },
      },
      {
        id: 's1-camerino', nombre: 'Camerino de artistas',
        poligono: [[4.9, 25.0], [7.3, 25.0], [7.25, 27.2], [4.9, 27.2]],
        color: 0x5f6672,
        ficha: {
          m2: 6, aforo: 6,
          descripcion: 'Green room con baño propio y bajada directa a la cabina (S−2) sin cruzar público: los artistas aparecen y desaparecen.',
          sonido: 'Monitoreo del programa de sala.', luces: 'Luz de camerino regulable.',
        },
      },
      {
        id: 's1-speakeasy', nombre: 'El Secreto',
        poligono: [[0.3, 27.9], [7.2, 27.9], [6.85, 33.6], [0.3, 33.6]],
        color: 0xffffff,
        ficha: {
          m2: 36, aforo: 35,
          descripcion: 'El secreto dentro del secreto: salón oculto tras un muro pivotante de cava. Coctelería de autor con destilados andinos, 35 asientos, host propio. Solo VIP top y artistas; ni siquiera todos los que están dentro saben que existe.',
          sonido: 'Vinilo y música en vivo íntima; 2× X4i + sub compacto, 85 dB máx.',
          luces: 'Velas reales normadas + ámbar 2000 K. Cero pantallas.',
        },
      },
    ],
    props: [
      { tipo: 'baranda', segmentos: [
        { p1: [3.0, 12.0], p2: [3.0, 24.5] }, { p1: [3.0, 12.0], p2: [7.15, 12.0] },
        { p1: [7.15, 12.0], p2: [7.1, 24.5] }, { p1: [3.0, 24.5], p2: [7.1, 24.5] },
      ], material: 'vidrioBaranda' },
      { tipo: 'barra', box: [[6.6, 8.6, 0], [8.8, 9.6, 1.1]], material: 'barraEmisiva' },
      { tipo: 'barraSecreto', box: [[0.6, 32.2, 0], [5.8, 33.2, 1.1]], material: 'barraEmisiva' },
    ],
    lightAnchors: [
      { pos: [4.5, -1.2, 10], tipo: 'pulse' }, { pos: [1.5, -1.4, 18], tipo: 'pulse' },
      { pos: [3.5, -1.2, 30.5], tipo: 'pulse' },
    ],
  },

  // ================= PISO 1 · CAFÉ & LA PUERTA =================
  {
    id: 'p1',
    nombre: 'Piso 1 · Café & la puerta discreta',
    orden: 3,
    elev: 0.0,
    alturaLibre: 3.05,
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [7.17, 32.0], [0.0, 32.0]],
      huecos: [[[2.5, 19.0], [7.71, 19.0], [7.20, 25.0], [2.5, 25.0]]], // patio de luz
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.05 },  // núcleo
      { p1: [0.0, 8.0], p2: [1.0, 8.0], espesor: 0.20, altura: 3.05 },  // núcleo (vano x 1.0–2.2)
      { p1: [2.2, 8.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.05 },
      { p1: [0.0, 13.0], p2: [9.0, 13.0], espesor: 0.15, altura: 3.05 }, // fondo del café (la puerta de acero teleporta antes)
      { p1: [6.2, 13.0], p2: [6.2, 18.8], espesor: 0.15, altura: 3.05 },
      { p1: [0.0, 25.2], p2: [7.55, 25.2], espesor: 0.15, altura: 3.05 },
      { p1: [4.0, 25.2], p2: [4.0, 31.8], espesor: 0.15, altura: 3.05 },
    ],
    zonas: [
      {
        id: 'p1-dropoff', nombre: 'Bahía drop-off',
        poligono: [[0.3, 0.2], [9.5, 0.2], [9.4, 2.8], [0.3, 2.8]],
        color: 0x8a8f98, exterior: true,
        ficha: {
          m2: 27, aforo: 0,
          descripcion: 'Retiro frontal de 3 m convertido en bahía de llegada 100 % drop-off (taxi/aplicativo): marquesina, host de puerta, sin estacionamiento propio. La llegada es coreografía: puerta del auto → puerta del edificio en 6 pasos.',
          sonido: 'Inmisión nocturna en fachada ≤ 50 dB(A): el club es inaudible aquí.',
          luces: 'Marquesina de luz ámbar tenue; el único letrero visible es el del café.',
        },
      },
      {
        id: 'p1-cafe', nombre: 'Café de especialidad',
        poligono: [[0.3, 3.4], [9.3, 3.4], [8.7, 12.7], [0.3, 12.7]],
        color: 0xf5a623,
        ficha: {
          m2: 78, aforo: 40,
          descripcion: 'La marca diurna y la fachada del mito: café de especialidad (tueste local, métodos de filtrado) con brunch de fin de semana. Abre todos los días; legitima el edificio ante el barrio y la municipalidad. De noche, sus últimas mesas ven pasar a los que "saben".',
          sonido: 'Música ambiente de día (70 dB máx.), doble losa lo separa del club.',
          luces: 'Luz natural del frente + patio; cálida 2700 K de noche.',
        },
      },
      {
        id: 'p1-recepcion', nombre: 'Recepción & puerta discreta',
        poligono: [[0.3, 13.3], [5.9, 13.3], [5.9, 18.7], [0.3, 18.7]],
        color: 0xffffff,
        ficha: {
          m2: 28, aforo: 15,
          descripcion: 'Aquí ocurre la selección: un host con lista de referidos (no hay taquilla, no hay letrero). La puerta al subsuelo es una pieza escultórica de acero con el único símbolo del club. Esclusa acústica y escalera escenográfica descienden al lounge.',
          sonido: 'Vestíbulo silencioso: la primera hoja acústica está aquí.',
          luces: 'Un solo haz cenital sobre la puerta de acero.',
        },
      },
      {
        id: 'p1-galeria', nombre: 'Galería del patio',
        poligono: [[0.3, 19.0], [2.3, 19.0], [2.3, 25.0], [0.3, 25.0]],
        color: 0xd98e2b,
        ficha: {
          m2: 12, aforo: 8,
          descripcion: 'Corredor vidriado junto al patio de luz que conecta recepción con la zona de servicio, bordeando el jardín vertical.',
          sonido: '—', luces: 'Luz natural cenital.',
        },
      },
      {
        id: 'p1-patio', nombre: 'Patio de luz',
        poligono: [[2.5, 19.0], [7.71, 19.0], [7.2, 25.0], [2.5, 25.0]],
        color: 0x4f7a5a, exterior: true,
        ficha: {
          m2: 30, aforo: 0,
          descripcion: 'Pozo de luz de ~30 m² con jardín vertical de flora altoandina: aporta el área libre normativa (junto a los retiros suma 91.5 m² = 30.7 %), ventila e ilumina P1–P3 y se alinea en planta con el vacío de La Catedral, 10 m más abajo.',
          sonido: 'Silencio: no hay fuentes sonoras al aire libre en todo el proyecto.',
          luces: 'Luz natural de día; de noche, uplight vegetal tenue.',
        },
      },
      {
        id: 'p1-servicio', nombre: 'Cocina de apoyo & baños',
        poligono: [[0.3, 25.5], [7.5, 25.5], [7.2, 31.7], [0.3, 31.7]],
        color: 0x5f6672,
        ficha: {
          m2: 40, aforo: 8,
          descripcion: 'Cocina de apoyo del café, baños de día, cuarto de residuos refrigerado y salida de servicio/evacuación al retiro posterior (Pasaje Peatonal): logística y evacuación nunca cruzan la experiencia del cliente.',
          sonido: '—', luces: 'Luz de trabajo.',
        },
      },
    ],
    props: [
      { tipo: 'barra', box: [[5.6, 4.0, 0], [8.9, 5.2, 1.05]], material: 'barraEmisiva' }, // barra de café
      { tipo: 'puerta', box: [[3.4, 13.05, 0], [4.6, 13.35, 2.6]], material: 'aceroPuerta' },
    ],
    lightAnchors: [
      { pos: [4.5, 2.3, 8], tipo: 'pulse' }, { pos: [4.0, 2.5, 15.5], tipo: 'pulse' },
    ],
  },

  // ================= PISO 2 · RESTAURANTE =================
  {
    id: 'p2',
    nombre: 'Piso 2 · Restaurante day-to-night',
    orden: 4,
    elev: 3.4,
    alturaLibre: 3.05,
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [7.17, 32.0], [0.0, 32.0]],
      huecos: [[[2.5, 19.0], [7.71, 19.0], [7.20, 25.0], [2.5, 25.0]]],
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.05 },  // núcleo
      { p1: [1.6, 18.8], p2: [2.5, 18.8], espesor: 0.15, altura: 3.05 }, // vano x 0–1.6 al comedor del patio
      { p1: [0.0, 25.2], p2: [7.55, 25.2], espesor: 0.15, altura: 3.05 },
    ],
    zonas: [
      {
        id: 'p2-cava', nombre: 'Cava & barra del restaurante',
        poligono: [[3.1, 3.4], [9.3, 3.4], [9.15, 7.6], [3.1, 7.6]],
        color: 0xd98e2b,
        ficha: {
          m2: 25, aforo: 12,
          descripcion: 'Barra de entrada con cava vidriada de doble altura visual: vermut, vinos de altura y coctelería de aperitivo. A las 23:00 se convierte en el primer filtro social de la noche.',
          sonido: 'Zona propia 2× X4i.', luces: 'Cava retroiluminada, barra en ámbar.',
        },
      },
      {
        id: 'p2-comedor', nombre: 'Comedor principal',
        poligono: [[0.3, 8.0], [9.0, 8.0], [8.2, 18.6], [0.3, 18.6]],
        color: 0xf5a623,
        ficha: {
          m2: 85, aforo: 70,
          descripcion: 'Cocina de autor arequipeña contemporánea (70 cubiertos). Modelo day-to-night: almuerzo ejecutivo, cena, y desde las 23:00 baja la luz, sube el programa musical y se vuelve la antesala gastronómica del club. Mesas junto al patio de luz.',
          sonido: 'Sistema zonal discreto, presets día/noche (70→85 dB).',
          luces: 'Escenas DALI: mediodía neutro → cena 2400 K → noche ámbar teatral.',
        },
      },
      {
        id: 'p2-balcon-patio', nombre: 'Comedor del patio',
        poligono: [[0.3, 19.1], [2.3, 19.1], [2.3, 24.9], [0.3, 24.9]],
        color: 0xd98e2b,
        ficha: {
          m2: 12, aforo: 10,
          descripcion: 'Mesas íntimas en la galería vidriada frente al jardín vertical del patio.',
          sonido: '—', luces: 'Natural + velas.',
        },
      },
      {
        id: 'p2-cocina', nombre: 'Cocina principal',
        poligono: [[0.3, 25.5], [7.5, 25.5], [7.2, 31.7], [0.3, 31.7]],
        color: 0x5f6672,
        ficha: {
          m2: 40, aforo: 10,
          descripcion: 'Cocina central del edificio: sirve al restaurante, al room service de boxes (montaplatos a S−1/S−2) y al café. Extracción con silenciadores a azotea.',
          sonido: '—', luces: 'Luz de trabajo 4000 K.',
        },
      },
    ],
    props: [
      { tipo: 'barra', box: [[3.4, 4.0, 0], [8.9, 5.1, 1.05]], material: 'barraEmisiva' },
    ],
    lightAnchors: [
      { pos: [4.5, 5.9, 12], tipo: 'pulse' }, { pos: [5.5, 5.9, 5.5], tipo: 'pulse' },
    ],
  },

  // ================= PISO 3 · SALONES & MEMBRESÍAS =================
  {
    id: 'p3',
    nombre: 'Piso 3 · Salones privados & membresías',
    orden: 5,
    elev: 6.8,
    alturaLibre: 3.05,
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [7.34, 28.0], [0.0, 28.0]],
      huecos: [[[2.5, 19.0], [7.71, 19.0], [7.55, 25.0], [2.5, 25.0]]],
    },
    muros: [
      { p1: [2.8, 3.0], p2: [2.8, 8.0], espesor: 0.20, altura: 3.05 },  // núcleo
      { p1: [0.0, 9.5], p2: [3.4, 9.5], espesor: 0.15, altura: 3.05 },  // vano x 3.4–4.6 (puerta)
      { p1: [4.6, 9.5], p2: [9.0, 9.5], espesor: 0.15, altura: 3.05 },
      { p1: [1.6, 18.8], p2: [2.5, 18.8], espesor: 0.15, altura: 3.05 },
      { p1: [0.0, 25.2], p2: [7.6, 25.2], espesor: 0.15, altura: 3.05 },
    ],
    zonas: [
      {
        id: 'p3-private', nombre: 'Private dining',
        poligono: [[3.1, 3.4], [9.3, 3.4], [9.1, 9.2], [3.1, 9.2]],
        color: 0xf5a623,
        ficha: {
          m2: 32, aforo: 16,
          descripcion: 'Comedor privado de 16 asientos con mesa única de madera de un solo tronco: cenas de directorio, catas y menú del chef. Reservable solo por miembros.',
          sonido: 'Sistema propio discreto.', luces: 'Lámpara escultórica central, 2200 K.',
        },
      },
      {
        id: 'p3-salones', nombre: 'Salones VIP día / eventos',
        poligono: [[0.3, 9.9], [8.9, 9.9], [8.2, 18.6], [0.3, 18.6]],
        color: 0xd98e2b,
        ficha: {
          m2: 70, aforo: 60,
          descripcion: 'Dos salones divisibles (tabique móvil acústico) para el negocio de día lunes–jueves: directorios, lanzamientos y afterworks corporativos del sector minero-energético de Arequipa, con el AV del club como diferenciador imbatible.',
          sonido: 'Sistema de conferencias + refuerzo musical zonal.',
          luces: 'Escenas presentación/cóctel/fiesta privada.',
        },
      },
      {
        id: 'p3-oficina', nombre: 'Oficina & CRM de membresías',
        poligono: [[0.3, 25.5], [7.55, 25.5], [7.35, 27.7], [0.3, 27.7]],
        color: 0x5f6672,
        ficha: {
          m2: 14, aforo: 8,
          descripcion: 'Cerebro comercial: administración y el CRM de hospitalidad donde vive el perfil de cada miembro y VIP (preferencias de mesa, botella, música, fechas). Aquí se gestiona el paso de la fase referidos a la membresía anual.',
          sonido: '—', luces: 'Oficina 4000 K.',
        },
      },
    ],
    props: [],
    lightAnchors: [
      { pos: [4.5, 9.3, 13], tipo: 'pulse' }, { pos: [5.5, 9.3, 6], tipo: 'pulse' },
    ],
  },

  // ================= AZOTEA · TERRAZA & PLANTA TÉCNICA =================
  {
    id: 'az',
    nombre: 'Azotea · Terraza de brunch & planta técnica',
    orden: 6,
    elev: 10.2,
    alturaLibre: 0.0, // nivel abierto
    losa: {
      contorno: [[0.0, 3.0], [9.48, 3.0], [7.34, 28.0], [0.0, 28.0]],
      huecos: [[[2.5, 19.0], [7.71, 19.0], [7.55, 25.0], [2.5, 25.0]]],
    },
    muros: [
      // parapeto perimetral 1.2 m se genera como baranda en props
      { p1: [0.0, 17.5], p2: [7.85, 17.5], espesor: 0.15, altura: 2.4 }, // pantalla técnica
    ],
    zonas: [
      {
        id: 'az-terraza', nombre: 'Terraza de brunch (solo día)',
        poligono: [[0.3, 3.4], [9.3, 3.4], [8.4, 14.0], [0.3, 14.0]],
        color: 0xf5a623,
        ficha: {
          m2: 78, aforo: 45,
          descripcion: 'Extensión del café para brunch de fin de semana con vista al Misti y a la campiña de Cayma. SIN música exterior y cierre 18:00: cero impacto acústico nocturno hacia los vecinos (compromiso de convivencia del proyecto). Pérgola ligera no techada (no computa como piso).',
          sonido: 'Ninguno al exterior, por diseño.',
          luces: 'Guirnalda cálida de baja intensidad hasta las 18:00 en invierno.',
        },
      },
      {
        id: 'az-tecnica', nombre: 'Planta técnica',
        poligono: [[0.3, 17.8], [7.8, 17.8], [7.75, 19.0], [2.5, 19.0], [2.5, 25.0], [7.45, 25.0], [7.4, 27.7], [0.3, 27.7]],
        color: 0x5f6672,
        ficha: {
          m2: 42, aforo: 2,
          descripcion: 'Chillers del HVAC, inyección/extracción del club con silenciadores de celdas (trampas acústicas), extracción de cocina con precipitador, y grupo electrógeno insonorizado. Todo tras pantalla acústica: ≤ 45 dB(A) a 1 m del lindero.',
          sonido: 'Silenciadores dimensionados para NR-25 en ductos hacia el club.',
          luces: 'Servicio.',
        },
      },
    ],
    props: [
      { tipo: 'baranda', segmentos: [
        { p1: [0.0, 3.0], p2: [9.48, 3.0] }, { p1: [9.48, 3.0], p2: [7.34, 28.0] },
        { p1: [7.34, 28.0], p2: [0.0, 28.0] }, { p1: [0.0, 28.0], p2: [0.0, 3.0] },
      ], material: 'vidrioBaranda' },
      { tipo: 'chiller', box: [[0.7, 24.6, 0], [2.7, 26.6, 1.6]], material: 'murosBase' },
      { tipo: 'chiller', box: [[3.7, 25.2, 0], [5.7, 27.2, 1.6]], material: 'murosBase' },
    ],
    lightAnchors: [{ pos: [4.5, 12.4, 8], tipo: 'pulse' }],
  },
];

// ---------------------------------------------------------------------
// ESCALERAS / TELEPORTS (modo primera persona)
// zonaTrigger = AABB [xmin, zmin, xmax, zmax] en el nivel `de`.
// ---------------------------------------------------------------------
// El núcleo (x 0–2.8, z 3–8, vano de acceso en x 1.0–2.2 / z 8) conecta TODOS
// los niveles: tile ▲ subir (z 3.4–5.4) y tile ▼ bajar (z 5.6–7.6). Se llega
// a cada nivel justo afuera del vano, en [1.6, 9.3].
const LLEGADA = { pos: [1.6, 9.3], yaw: Math.PI };
const CADENA = ['s3', 's2', 's1', 'p1', 'p2', 'p3', 'az'];
const NOMBRE_CORTO = {
  s3: 'Sótano −3 · La Catedral', s2: 'Sótano −2 · Mezzanine VIP', s1: 'Sótano −1 · Lounge',
  p1: 'Piso 1 · Café', p2: 'Piso 2 · Restaurante', p3: 'Piso 3 · Salones', az: 'Azotea · Terraza',
};

export const STAIRS = [];
for (let i = 0; i < CADENA.length; i++) {
  if (i < CADENA.length - 1) {
    STAIRS.push({
      id: `core-${CADENA[i]}-up`, de: CADENA[i], a: CADENA[i + 1],
      zonaTrigger: [0.5, 3.4, 2.6, 5.4], destino: LLEGADA,
      etiqueta: `▲ ${NOMBRE_CORTO[CADENA[i + 1]]}`,
    });
  }
  if (i > 0) {
    STAIRS.push({
      id: `core-${CADENA[i]}-dn`, de: CADENA[i], a: CADENA[i - 1],
      zonaTrigger: [0.5, 5.6, 2.6, 7.6], destino: LLEGADA,
      etiqueta: `▼ ${NOMBRE_CORTO[CADENA[i - 1]]}`,
    });
  }
}
// Entrada escenográfica al club: la puerta de acero de recepción (P1) baja
// directo a la esclusa del lounge; la esclusa devuelve a recepción.
STAIRS.push(
  { id: 'club-in', de: 'p1', a: 's1', zonaTrigger: [3.2, 12.2, 5.6, 12.95], destino: { pos: [4.1, 5.0], yaw: Math.PI }, etiqueta: '⟠ Descender al club' },
  { id: 'club-out', de: 's1', a: 'p1', zonaTrigger: [3.2, 3.4, 5.2, 4.6], destino: { pos: [4.0, 11.2], yaw: 0 }, etiqueta: '▲ Salir a recepción' },
);

// ---------------------------------------------------------------------
export const MATERIALS = {
  murosBase: { color: 0x1c1c22, roughness: 0.92 },
  losa: { color: 0x141418, roughness: 0.95 },
  sillar: { color: 0x2a2723, roughness: 0.85 },
  barraEmisiva: { color: 0x111111, emissive: 0xf5a623, emissiveIntensity: 1.6 },
  muroLED: { color: 0x000000, emissive: 0xffffff, emissiveIntensity: 1.4, animado: 'led' },
  vidrioBaranda: { color: 0x88aabb, transparent: true, opacity: 0.25, roughness: 0.1 },
  aceroPuerta: { color: 0x0c0c0e, roughness: 0.4, metalness: 0.8, emissive: 0xf5a623, emissiveIntensity: 0.25 },
  terreno: { color: 0x0e0e11, roughness: 1.0 },
};
