// Texturas procedurales (canvas) — sin assets externos.
// Materialidad del proyecto: sillar, concreto oscuro pulido, acero, ámbar.

import * as THREE from 'three';

function canvas(w, h) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function ruido(ctx, w, h, alfa) {
  const img = ctx.getImageData(0, 0, w, h);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 255 * alfa;
    d[i] += n; d[i + 1] += n; d[i + 2] += n;
  }
  ctx.putImageData(img, 0, 0);
}

// Concreto/estuco oscuro con grano fino — muros interiores.
export function texturaConcreto(base = '#22222a') {
  const c = canvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, 256, 256);
  ruido(ctx, 256, 256, 0.10);
  // vetas sutiles de encofrado
  ctx.globalAlpha = 0.06;
  ctx.strokeStyle = '#000';
  for (let y = 0; y < 256; y += 42) {
    ctx.beginPath(); ctx.moveTo(0, y + Math.random() * 6); ctx.lineTo(256, y + Math.random() * 6); ctx.stroke();
  }
  ctx.globalAlpha = 1;
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(2, 2);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Sillar: piedra volcánica blanca en aparejo — acentos y fachada.
export function texturaSillar() {
  const c = canvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#d9d2c4';
  ctx.fillRect(0, 0, 256, 256);
  const filas = 5, alto = 256 / filas;
  for (let f = 0; f < filas; f++) {
    const off = (f % 2) * 64;
    for (let x = -64; x < 256; x += 128) {
      ctx.fillStyle = `hsl(40, ${16 + Math.random() * 8}%, ${78 + Math.random() * 8}%)`;
      ctx.fillRect(x + off + 2, f * alto + 2, 124, alto - 4);
    }
  }
  ruido(ctx, 256, 256, 0.07);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(1.6, 1.6);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Piso oscuro pulido con junta — losas.
export function texturaPiso() {
  const c = canvas(256, 256);
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#17171c';
  ctx.fillRect(0, 0, 256, 256);
  ruido(ctx, 256, 256, 0.05);
  ctx.strokeStyle = 'rgba(0,0,0,0.5)';
  ctx.lineWidth = 2;
  for (let i = 0; i <= 256; i += 128) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 256); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(256, i); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(4, 4);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Terreno urbano tenue con retícula.
export function texturaTerreno() {
  const c = canvas(512, 512);
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(256, 256, 40, 256, 256, 380);
  g.addColorStop(0, '#15151a');
  g.addColorStop(1, '#0a0a0d');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = 'rgba(245,166,35,0.05)';
  for (let i = 0; i <= 512; i += 32) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 512); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(512, i); ctx.stroke();
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// Muro LED animado: canvas vivo que se redibuja (~12 Hz) — barras de
// ecualizador + destellos, en la paleta ámbar/blanco del club.
export class MuroLED {
  constructor(cols = 28, filas = 30) {
    this.cols = cols; this.filas = filas;
    this.c = canvas(224, 240);
    this.ctx = this.c.getContext('2d');
    this.textura = new THREE.CanvasTexture(this.c);
    this.textura.colorSpace = THREE.SRGBColorSpace;
    this._ultimo = 0;
  }

  update(t) {
    if (t - this._ultimo < 0.08) return;
    this._ultimo = t;
    const { ctx, c, cols, filas } = this;
    const cw = c.width / cols, ch = c.height / filas;
    ctx.fillStyle = '#050403';
    ctx.fillRect(0, 0, c.width, c.height);
    for (let x = 0; x < cols; x++) {
      const fase = x * 0.45 + t * 2.2;
      const nivel = Math.floor((0.42 + 0.4 * Math.sin(fase) * Math.sin(t * 0.7 + x)) * filas);
      for (let y = 0; y < nivel; y++) {
        const pico = y > nivel - 3;
        const brillo = 0.35 + 0.65 * (y / filas);
        ctx.fillStyle = pico
          ? `rgba(255,244,224,${0.85})`
          : `rgba(245,${Math.floor(120 + 60 * brillo)},35,${0.25 + 0.6 * brillo})`;
        ctx.fillRect(x * cw + 1, c.height - (y + 1) * ch + 1, cw - 2, ch - 2);
      }
    }
    // destello aleatorio de strobe suave
    if (Math.sin(t * 3.7) > 0.96) {
      ctx.fillStyle = 'rgba(255,250,240,0.25)';
      ctx.fillRect(0, 0, c.width, c.height);
    }
    this.textura.needsUpdate = true;
  }
}
