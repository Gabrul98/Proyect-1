// Rig de iluminación: modo maqueta (luz neutra) y modo nocturno first-person
// (pool de PointLights reasignadas al nivel activo + emisivos animados + niebla).

import * as THREE from 'three';
import { AMBAR, FONDO, FONDO_FP } from './constants.js';

const MAX_LUCES = 6;

function texturaGlow() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(32, 32, 2, 32, 32, 30);
  g.addColorStop(0, 'rgba(255,190,90,0.9)');
  g.addColorStop(0.4, 'rgba(245,166,35,0.35)');
  g.addColorStop(1, 'rgba(245,166,35,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

export class RigLuces {
  constructor(escena, emissives, lightAnchors) {
    this.escena = escena;
    this.emissives = emissives;
    this.lightAnchors = lightAnchors;

    // Luz de maqueta
    this.ambienteIso = new THREE.AmbientLight(0xffffff, 1.6);
    this.solIso = new THREE.DirectionalLight(0xfff2e0, 1.6);
    this.solIso.position.set(30, 50, -20);
    escena.add(this.ambienteIso, this.solIso);

    // Luz nocturna base
    this.ambienteFP = new THREE.AmbientLight(0x28211c, 0.65);
    this.ambienteFP.visible = false;
    escena.add(this.ambienteFP);

    // Pool de luces puntuales
    this.pool = [];
    for (let i = 0; i < MAX_LUCES; i++) {
      const l = new THREE.PointLight(AMBAR, 0, 14, 1.8);
      l.visible = false;
      escena.add(l);
      this.pool.push({ luz: l, tipo: 'pulse', base: new THREE.Vector3(), fase: i * 1.37 });
    }

    // Sprites de glow (se recolocan con las luces)
    const tex = texturaGlow();
    this.glows = this.pool.map(() => {
      const s = new THREE.Sprite(new THREE.SpriteMaterial({
        map: tex, blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0,
      }));
      s.scale.set(1.5, 1.5, 1);
      escena.add(s);
      return s;
    });

    this.nieblaFp = new THREE.FogExp2(FONDO_FP, 0.05);
    this.modo = 'iso';
  }

  setModo(modo, nivelActivoId) {
    this.modo = modo;
    const noche = modo === 'fp';
    this.ambienteIso.visible = !noche;
    this.solIso.visible = !noche;
    this.ambienteFP.visible = noche;
    this.escena.fog = noche ? this.nieblaFp : null;
    this.escena.background = new THREE.Color(noche ? FONDO_FP : FONDO);
    if (noche) this.asignarNivel(nivelActivoId);
    else this.pool.forEach((p, i) => { p.luz.visible = false; this.glows[i].material.opacity = 0; });
  }

  // Recoloca el pool de luces en las anclas del nivel activo (modo fp).
  asignarNivel(nivelId) {
    const anclas = this.lightAnchors[nivelId] ?? [];
    this.pool.forEach((p, i) => {
      const a = anclas[i % Math.max(anclas.length, 1)];
      if (!a || this.modo !== 'fp') { p.luz.visible = false; this.glows[i].material.opacity = 0; return; }
      p.base.copy(a.pos);
      p.tipo = a.tipo;
      p.luz.position.copy(a.pos);
      p.luz.visible = i < anclas.length * 2; // duplica anclas con fases distintas si hay pocas
      this.glows[i].position.copy(a.pos);
    });
  }

  update(t) {
    // Emisivos animados (muro LED, barras)
    for (const e of this.emissives) {
      if (e.tipo === 'led') {
        const v = 0.9 + 0.7 * Math.abs(Math.sin(t * 1.7)) + 0.25 * Math.sin(t * 9.3);
        e.material.emissiveIntensity = this.modo === 'fp' ? v : 1.2;
        const h = 0.09 + 0.03 * Math.sin(t * 0.4); // ámbar ↔ blanco cálido
        e.material.emissive.setHSL(h, 0.85, 0.5 + 0.3 * Math.sin(t * 1.1));
      }
    }
    if (this.modo !== 'fp') return;
    this.pool.forEach((p, i) => {
      if (!p.luz.visible) return;
      const f = t + p.fase;
      let intensidad = 50;
      if (p.tipo === 'pulse') intensidad = 38 + 22 * Math.sin(f * 2.1);
      else if (p.tipo === 'sweep') {
        intensidad = 50 + 16 * Math.sin(f * 3.1);
        p.luz.position.x = p.base.x + Math.sin(f * 0.9) * 2.2;
        p.luz.position.z = p.base.z + Math.cos(f * 0.7) * 1.6;
      } else if (p.tipo === 'strobe') {
        intensidad = (Math.sin(f * 14) > 0.82 && Math.sin(f * 0.5) > 0) ? 140 : 12;
      }
      p.luz.intensity = intensidad;
      const g = this.glows[i];
      g.position.copy(p.luz.position);
      g.material.opacity = Math.min(0.4, intensidad / 160);
    });
  }
}
