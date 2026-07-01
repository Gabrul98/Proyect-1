// Constantes globales del visor — Proyecto C-4
export const AMBAR = 0xf5a623;
export const FONDO = 0x0a0a0c;
export const FONDO_FP = 0x07070a;

export const SEP_EXPLODE = 3.6;   // separación vertical entre niveles al explotar (m)
export const ISO_ALTO = 46;       // alto del frustum ortográfico (m)
export const ISO_TARGET_Y = 8;    // centro vertical del encuadre isométrico
export const ALTURA_OJO = 1.65;   // altura de cámara first-person (m)
export const RADIO_JUGADOR = 0.35;
export const VEL_CAMINAR = 3.0;   // m/s
export const VEL_CORRER = 5.2;    // m/s

export const ES_TACTIL = typeof window !== 'undefined' &&
  window.matchMedia && window.matchMedia('(pointer: coarse)').matches;

export const PIXEL_RATIO_MAX = ES_TACTIL ? 1.5 : 1.75;

export const CENTRO = { x: 4.5, z: 18.5 }; // centro aproximado del edificio en planta
