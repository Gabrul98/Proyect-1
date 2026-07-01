// Proyecto C-4 — visor 3D. Orquesta escena, modos y UI.

import * as THREE from 'three';
import { construirEdificio } from './build.js';
import { RigLuces } from './lights.js';
import { ModoIsometrico } from './modes/isometric.js';
import { ModoFirstPerson } from './modes/firstperson.js';
import { TouchJoystick } from './controls/touchJoystick.js';
import { FONDO, PIXEL_RATIO_MAX, ES_TACTIL } from './constants.js';
import { ocultarFicha } from './ui/panel.js';

const canvas = document.getElementById('escena');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, PIXEL_RATIO_MAX));
renderer.setSize(window.innerWidth, window.innerHeight);

const escena = new THREE.Scene();
escena.background = new THREE.Color(FONDO);

const edificio = construirEdificio();
escena.add(edificio.buildingGroup);

const rig = new RigLuces(escena, edificio.emissives, edificio.lightAnchors);
const joystick = new TouchJoystick(document.getElementById('touch-capa'));
const iso = new ModoIsometrico(renderer, escena, edificio);
const fp = new ModoFirstPerson(renderer, escena, edificio, joystick, rig);

let modo = 'iso';
const $ = (id) => document.getElementById(id);

function setModo(nuevo) {
  modo = nuevo;
  const esFp = modo === 'fp';
  if (esFp) { iso.compactar(); ocultarFicha(); }
  iso.activar(!esFp);
  fp.activar(esFp);
  rig.setModo(esFp ? 'fp' : 'iso', fp.nivelActivo);
  $('ui-iso').classList.toggle('oculto', esFp);
  $('ui-fp').classList.toggle('oculto', !esFp);
  $('btn-maqueta').classList.toggle('activo', !esFp);
  $('btn-recorrido').classList.toggle('activo', esFp);
  $('touch-capa').style.pointerEvents = esFp && ES_TACTIL ? 'auto' : 'none';
}

$('btn-maqueta').addEventListener('click', () => setModo('iso'));
$('btn-recorrido').addEventListener('click', () => setModo('fp'));
fp.onSalir(() => setModo('iso'));

$('explode').addEventListener('input', (e) => iso.setExplode(parseFloat(e.target.value)));

$('splash-entrar').addEventListener('click', () => {
  $('splash').classList.add('oculto');
});

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  const aspecto = window.innerWidth / window.innerHeight;
  iso.resize(aspecto);
  fp.resize(aspecto);
});

// Degradación automática de pixelRatio si el framerate cae (móvil).
let fpsAcum = 0, fpsMuestras = 0, degradado = false;

const reloj = new THREE.Clock();
function animar() {
  requestAnimationFrame(animar);
  const dt = Math.min(reloj.getDelta(), 0.05);
  const t = reloj.elapsedTime;

  if (modo === 'iso') iso.update(dt); else fp.update(dt);
  rig.update(t);

  if (!degradado && dt > 0) {
    fpsAcum += 1 / dt; fpsMuestras++;
    if (fpsMuestras === 240 && fpsAcum / fpsMuestras < 42) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.2));
      degradado = true;
    }
  }

  renderer.render(escena, modo === 'iso' ? iso.camara : fp.camara);
}

setModo('iso');
iso.setExplode(0);
animar();

// Hook de inspección (consola del navegador / pruebas automatizadas)
window.__c4 = { fp, iso, setModo };
