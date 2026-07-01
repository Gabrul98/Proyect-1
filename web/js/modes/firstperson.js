// Modo recorrido: cámara en primera persona con PointerLock (desktop) o
// joystick táctil, colisión 2D contra muros del nivel activo y teleport
// por escaleras con fundido.

import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { LEVELS, STAIRS, SPAWN } from '../../data/levels.js';
import { ALTURA_OJO, RADIO_JUGADOR, VEL_CAMINAR, VEL_CORRER, ES_TACTIL } from '../constants.js';
import { resolverColision, dentroAABB } from '../collision.js';

const nivelPorId = Object.fromEntries(LEVELS.map((n) => [n.id, n]));

export class ModoFirstPerson {
  constructor(renderer, escena, edificio, joystick, rigLuces) {
    this.edificio = edificio;
    this.joystick = joystick;
    this.rigLuces = rigLuces;
    this.activo = false;
    this.nivelActivo = SPAWN.nivel;
    this._teclas = new Set();
    this._cooldown = 0;
    this._fade = document.getElementById('fade');
    this._hudNivel = document.getElementById('hud-nivel');
    this._toast = document.getElementById('toast');

    this.camara = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.05, 120);
    this.camara.rotation.order = 'YXZ'; // yaw/pitch legibles y compatibles con PointerLock
    this.controles = new PointerLockControls(this.camara, renderer.domElement);
    escena.add(this.controles.getObject());
    this._dir = new THREE.Vector3();

    this._colocar(SPAWN.nivel, SPAWN.pos, SPAWN.yaw);

    window.addEventListener('keydown', (e) => this._teclas.add(e.code));
    window.addEventListener('keyup', (e) => this._teclas.delete(e.code));
    this.controles.addEventListener('unlock', () => {
      if (this.activo && !ES_TACTIL) this._onSalir?.();
    });
  }

  onSalir(cb) { this._onSalir = cb; }

  activar(v) {
    this.activo = v;
    this.joystick.habilitar(v && ES_TACTIL);
    if (v) {
      this._colocar(this.nivelActivo, null, null);
      this.rigLuces.asignarNivel(this.nivelActivo);
      this._mostrarNivel();
      if (!ES_TACTIL) this.controles.lock();
    } else if (this.controles.isLocked) {
      this.controles.unlock();
    }
  }

  _colocar(nivelId, pos, yaw) {
    this.nivelActivo = nivelId;
    const nivel = nivelPorId[nivelId];
    const obj = this.controles.getObject();
    if (pos) { obj.position.x = pos[0]; obj.position.z = pos[1]; }
    obj.position.y = nivel.elev + ALTURA_OJO;
    if (yaw !== null && yaw !== undefined) {
      this.camara.rotation.set(0, 0, 0);
      obj.rotation.set(0, yaw, 0);
    }
  }

  _mostrarNivel(etiqueta) {
    const nivel = nivelPorId[this.nivelActivo];
    this._hudNivel.textContent = nivel.nombre;
    if (etiqueta) {
      this._toast.textContent = etiqueta.replace(/^[▲▼⟠]\s*/, '');
      this._toast.classList.add('visible');
      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => this._toast.classList.remove('visible'), 2200);
    }
  }

  _teleport(escalera) {
    this._cooldown = 1.0;
    this._fade.classList.add('activo');
    setTimeout(() => {
      this._colocar(escalera.a, escalera.destino.pos, escalera.destino.yaw);
      this.rigLuces.asignarNivel(escalera.a);
      this._mostrarNivel(escalera.etiqueta);
      this._fade.classList.remove('activo');
    }, 280);
  }

  resize(aspecto) {
    this.camara.aspect = aspecto;
    this.camara.updateProjectionMatrix();
  }

  update(dt) {
    if (!this.activo) return;
    this._cooldown = Math.max(0, this._cooldown - dt);
    const obj = this.controles.getObject();

    // --- dirección de movimiento ---
    let adelante = 0, lateral = 0;
    if (this._teclas.has('KeyW') || this._teclas.has('ArrowUp')) adelante += 1;
    if (this._teclas.has('KeyS') || this._teclas.has('ArrowDown')) adelante -= 1;
    if (this._teclas.has('KeyD') || this._teclas.has('ArrowRight')) lateral += 1;
    if (this._teclas.has('KeyA') || this._teclas.has('ArrowLeft')) lateral -= 1;
    if (ES_TACTIL) {
      adelante += this.joystick.movimiento.y;
      lateral += this.joystick.movimiento.x;
      const mirada = this.joystick.consumirMirada();
      obj.rotation.y -= mirada.x * 0.004;
      this.camara.rotation.x = Math.max(-1.35, Math.min(1.35, this.camara.rotation.x - mirada.y * 0.004));
    }

    const correr = this._teclas.has('ShiftLeft') || this._teclas.has('ShiftRight');
    const vel = (correr ? VEL_CORRER : VEL_CAMINAR) * dt;
    const mag = Math.hypot(adelante, lateral);
    if (mag > 0.01) {
      const nf = adelante / Math.max(mag, 1), nl = lateral / Math.max(mag, 1);
      this.camara.getWorldDirection(this._dir);
      const fl = Math.hypot(this._dir.x, this._dir.z) || 1;
      const fx = this._dir.x / fl, fz = this._dir.z / fl;   // adelante (aplanado)
      const rx = -fz, rz = fx;                              // derecha = adelante × arriba
      const dx = (fx * nf + rx * nl) * vel;
      const dz = (fz * nf + rz * nl) * vel;
      const segs = this.edificio.colliders[this.nivelActivo] ?? [];
      let [nx, nz] = resolverColision(obj.position.x + dx, obj.position.z, RADIO_JUGADOR, segs);
      [nx, nz] = resolverColision(nx, nz + dz, RADIO_JUGADOR, segs);
      obj.position.x = nx;
      obj.position.z = nz;
    }

    // --- triggers de escalera ---
    if (this._cooldown === 0) {
      for (const esc of STAIRS) {
        if (esc.de !== this.nivelActivo) continue;
        if (dentroAABB(obj.position.x, obj.position.z, esc.zonaTrigger)) {
          this._teleport(esc);
          break;
        }
      }
    }
  }
}
