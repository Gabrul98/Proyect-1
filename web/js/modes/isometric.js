// Modo maqueta: cámara ortográfica isométrica, órbita, explode de niveles,
// selección de zonas con ficha técnica.

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SEP_EXPLODE, CENTRO, ISO_ALTO, ISO_TARGET_Y } from '../constants.js';
import { mostrarFicha, ocultarFicha } from '../ui/panel.js';

export class ModoIsometrico {
  constructor(renderer, escena, edificio) {
    this.escena = escena;
    this.edificio = edificio;
    this.factorExplode = 0;
    this._objetivos = new Map(); // group -> y objetivo
    this._seleccion = null;
    this._hover = null;
    this._raycaster = new THREE.Raycaster();
    this._puntero = new THREE.Vector2();
    this._punteroMovido = true;
    this._abajo = null;

    const aspecto = window.innerWidth / window.innerHeight;
    const h = ModoIsometrico.altoFrustum(aspecto);
    this.camara = new THREE.OrthographicCamera(-h * aspecto / 2, h * aspecto / 2, h / 2, -h / 2, -200, 400);
    this.camara.position.set(CENTRO.x + 44, 40, CENTRO.z - 44);
    this.camara.lookAt(CENTRO.x, ISO_TARGET_Y, CENTRO.z);

    this.controles = new OrbitControls(this.camara, renderer.domElement);
    this.controles.target.set(CENTRO.x, ISO_TARGET_Y, CENTRO.z);
    this.controles.enableDamping = true;
    this.controles.dampingFactor = 0.08;
    this.controles.maxPolarAngle = Math.PI / 2.05;
    this.controles.autoRotate = true;      // la maqueta "vive" hasta que el usuario la toca
    this.controles.autoRotateSpeed = 0.65;
    this.controles.update();

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', (e) => {
      this._abajo = { x: e.clientX, y: e.clientY };
      if (this.controles.enabled) this.controles.autoRotate = false;
    });
    dom.addEventListener('pointerup', (e) => this._click(e));
    dom.addEventListener('pointermove', (e) => {
      this._puntero.x = (e.clientX / window.innerWidth) * 2 - 1;
      this._puntero.y = -(e.clientY / window.innerHeight) * 2 + 1;
      this._punteroMovido = true;
    });
  }

  activar(v) {
    this.controles.enabled = v;
    this.edificio.etiquetasNivel.forEach((s) => (s.visible = v));
    this.edificio.zoneMeshes.forEach((m) => (m.visible = v));
    if (!v) { this._deseleccionar(); ocultarFicha(); }
  }

  setExplode(f) { this.factorExplode = f; }

  // En pantallas verticales el frustum crece para que el edificio completo
  // (37 m de fondo + niveles explotados) siga entrando en el ancho.
  static altoFrustum(aspecto) {
    return Math.max(ISO_ALTO, 42 / Math.max(aspecto, 0.2));
  }

  resize(aspecto) {
    const h = ModoIsometrico.altoFrustum(aspecto);
    this.camara.left = -h * aspecto / 2;
    this.camara.right = h * aspecto / 2;
    this.camara.top = h / 2;
    this.camara.bottom = -h / 2;
    this.camara.updateProjectionMatrix();
  }

  _click(e) {
    if (!this.controles.enabled || !this._abajo) return;
    const d = Math.hypot(e.clientX - this._abajo.x, e.clientY - this._abajo.y);
    this._abajo = null;
    if (d > 7) return;
    // en táctil no hay pointermove previo: el puntero se toma del propio evento
    this._puntero.x = (e.clientX / window.innerWidth) * 2 - 1;
    this._puntero.y = -(e.clientY / window.innerHeight) * 2 + 1;
    this._raycaster.setFromCamera(this._puntero, this.camara);
    const hits = this._raycaster.intersectObjects(this.edificio.zoneMeshes, false);
    if (hits.length) {
      const mesh = hits[0].object;
      this._seleccionar(mesh);
      mostrarFicha(mesh.userData.zona, mesh.userData.nivelNombre);
    } else {
      this._deseleccionar();
      ocultarFicha();
    }
  }

  _seleccionar(mesh) {
    this._deseleccionar();
    this._seleccion = mesh;
    mesh.material.emissiveIntensity = 0.95;
    mesh.material.opacity = 0.92;
  }

  _deseleccionar() {
    if (this._seleccion) {
      this._seleccion.material.emissiveIntensity = 0.25;
      this._seleccion.material.opacity = 0.5;
      this._seleccion = null;
    }
  }

  update(dt) {
    this.controles.update();
    // Explode animado (lerp independiente del framerate)
    const k = 1 - Math.pow(0.002, dt);
    for (const nivel of Object.values(this.edificio.levelGroups)) {
      const datos = nivel.userData.nivel;
      const objetivo = datos.elev + this.factorExplode * datos.orden * SEP_EXPLODE;
      nivel.position.y += (objetivo - nivel.position.y) * k;
    }
    // Hover
    if (this._punteroMovido) {
      this._punteroMovido = false;
      this._raycaster.setFromCamera(this._puntero, this.camara);
      const hits = this._raycaster.intersectObjects(this.edificio.zoneMeshes, false);
      const nuevo = hits.length ? hits[0].object : null;
      if (this._hover !== nuevo) {
        if (this._hover && this._hover !== this._seleccion) this._hover.material.opacity = 0.5;
        this._hover = nuevo;
        if (nuevo && nuevo !== this._seleccion) nuevo.material.opacity = 0.75;
        document.body.style.cursor = nuevo ? 'pointer' : 'default';
      }
    }
  }

  compactar() {
    // fuerza offsets a 0 (al entrar a first-person)
    for (const nivel of Object.values(this.edificio.levelGroups)) {
      nivel.position.y = nivel.userData.nivel.elev;
    }
  }
}
