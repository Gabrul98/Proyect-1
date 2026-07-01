// Joystick virtual (mitad izquierda: mover) + arrastre (mitad derecha: mirar).
// Sin dependencias; pointer events sobre overlays DOM.

export class TouchJoystick {
  constructor(contenedor) {
    this.movimiento = { x: 0, y: 0 }; // -1..1 (x = strafe, y = adelante)
    this.deltaMirada = { x: 0, y: 0 }; // píxeles acumulados por frame
    this.activo = false;

    this.base = document.getElementById('joystick-base');
    this.stick = document.getElementById('joystick-stick');
    this._idMov = null;
    this._idMirada = null;
    this._origen = { x: 0, y: 0 };
    this._ultimo = { x: 0, y: 0 };

    contenedor.addEventListener('pointerdown', (e) => this._abajo(e));
    contenedor.addEventListener('pointermove', (e) => this._mueve(e));
    contenedor.addEventListener('pointerup', (e) => this._arriba(e));
    contenedor.addEventListener('pointercancel', (e) => this._arriba(e));
  }

  habilitar(v) {
    this.activo = v;
    if (!v) { this._reset(); this.base.style.display = 'none'; }
  }

  _abajo(e) {
    if (!this.activo) return;
    if (e.clientX < window.innerWidth / 2 && this._idMov === null) {
      this._idMov = e.pointerId;
      this._origen = { x: e.clientX, y: e.clientY };
      this.base.style.display = 'block';
      this.base.style.left = `${e.clientX - 55}px`;
      this.base.style.top = `${e.clientY - 55}px`;
      this._posStick(0, 0);
    } else if (this._idMirada === null) {
      this._idMirada = e.pointerId;
      this._ultimo = { x: e.clientX, y: e.clientY };
    }
  }

  _mueve(e) {
    if (!this.activo) return;
    if (e.pointerId === this._idMov) {
      const dx = e.clientX - this._origen.x, dy = e.clientY - this._origen.y;
      const d = Math.min(Math.hypot(dx, dy), 45);
      const a = Math.atan2(dy, dx);
      const px = Math.cos(a) * d, py = Math.sin(a) * d;
      this._posStick(px, py);
      this.movimiento.x = px / 45;
      this.movimiento.y = -py / 45;
    } else if (e.pointerId === this._idMirada) {
      this.deltaMirada.x += e.clientX - this._ultimo.x;
      this.deltaMirada.y += e.clientY - this._ultimo.y;
      this._ultimo = { x: e.clientX, y: e.clientY };
    }
  }

  _arriba(e) {
    if (e.pointerId === this._idMov) { this._idMov = null; this.movimiento.x = 0; this.movimiento.y = 0; this.base.style.display = 'none'; }
    if (e.pointerId === this._idMirada) this._idMirada = null;
  }

  _posStick(x, y) {
    this.stick.style.transform = `translate(${x}px, ${y}px)`;
  }

  _reset() {
    this.movimiento.x = 0; this.movimiento.y = 0;
    this.deltaMirada.x = 0; this.deltaMirada.y = 0;
    this._idMov = null; this._idMirada = null;
  }

  // Consume el delta de mirada acumulado (se llama una vez por frame).
  consumirMirada() {
    const d = { x: this.deltaMirada.x, y: this.deltaMirada.y };
    this.deltaMirada.x = 0; this.deltaMirada.y = 0;
    return d;
  }
}
