// Constructor procedural del edificio a partir de web/data/levels.js.
// Devuelve { buildingGroup, levelGroups, zoneMeshes, colliders, emissives,
//            lightAnchors, etiquetasNivel }.

import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { LOT, LEVELS, MATERIALS } from '../data/levels.js';

const GROSOR_LOSA = 0.35;
const ESPESOR_PERIMETRO = 0.3;

function crearMaterial(def) {
  const m = new THREE.MeshStandardMaterial({
    color: def.color ?? 0x222222,
    roughness: def.roughness ?? 0.9,
    metalness: def.metalness ?? 0.0,
  });
  if (def.emissive) {
    m.emissive = new THREE.Color(def.emissive);
    m.emissiveIntensity = def.emissiveIntensity ?? 1.0;
  }
  if (def.transparent) { m.transparent = true; m.opacity = def.opacity ?? 0.5; }
  return m;
}

function shapeDesdePoligono(poligono, huecos = []) {
  const shape = new THREE.Shape(poligono.map(([x, z]) => new THREE.Vector2(x, z)));
  for (const h of huecos) {
    shape.holes.push(new THREE.Path(h.map(([x, z]) => new THREE.Vector2(x, z))));
  }
  return shape;
}

// Extruye una shape XZ hacia abajo `profundidad` metros, con la cara superior en y=0 local.
function extruirPlano(shape, profundidad) {
  const geo = new THREE.ExtrudeGeometry(shape, { depth: profundidad, bevelEnabled: false });
  geo.rotateX(Math.PI / 2); // la Y de la shape pasa a ser Z del mundo; extrusión hacia −Y
  return geo;
}

function cajaMuro(p1, p2, espesor, altura) {
  const dx = p2[0] - p1[0], dz = p2[1] - p1[1];
  const largo = Math.hypot(dx, dz) + espesor; // cierra esquinas
  const geo = new THREE.BoxGeometry(largo, altura, espesor);
  const m = new THREE.Matrix4();
  const angulo = -Math.atan2(dz, dx);
  m.makeRotationY(angulo);
  m.setPosition((p1[0] + p2[0]) / 2, altura / 2, (p1[1] + p2[1]) / 2);
  geo.applyMatrix4(m);
  return geo;
}

function etiquetaSprite(texto) {
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = '600 34px Georgia, serif';
  const ancho = Math.ceil(ctx.measureText(texto).width) + 28;
  c.width = ancho; c.height = 56;
  const ctx2 = c.getContext('2d');
  ctx2.fillStyle = 'rgba(10,10,12,0.55)';
  ctx2.fillRect(0, 0, c.width, c.height);
  ctx2.font = '600 34px Georgia, serif';
  ctx2.fillStyle = '#f5e9d8';
  ctx2.textBaseline = 'middle';
  ctx2.fillText(texto, 14, 30);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 2;
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, depthTest: false, transparent: true }));
  const escala = 0.014;
  sprite.scale.set(c.width * escala, c.height * escala, 1);
  return sprite;
}

export function construirEdificio() {
  const buildingGroup = new THREE.Group();
  const levelGroups = {};
  const zoneMeshes = [];
  const colliders = {};   // por id de nivel: [{x1,z1,x2,z2}]
  const emissives = [];   // materiales animables { material, tipo }
  const lightAnchors = {}; // por id de nivel: [{pos: Vector3 (mundo), tipo}]
  const etiquetasNivel = [];

  const matLosa = crearMaterial(MATERIALS.losa);
  const matMuro = crearMaterial(MATERIALS.murosBase);
  const matBaranda = crearMaterial(MATERIALS.vidrioBaranda);

  for (const nivel of LEVELS) {
    const g = new THREE.Group();
    g.position.y = nivel.elev;
    g.userData.nivel = nivel;
    levelGroups[nivel.id] = g;
    buildingGroup.add(g);
    const segs = [];

    // --- Losa (piso del nivel) ---
    const shapeLosa = shapeDesdePoligono(nivel.losa.contorno, nivel.losa.huecos);
    const losa = new THREE.Mesh(extruirPlano(shapeLosa, GROSOR_LOSA), matLosa);
    g.add(losa);

    // --- Muros perimetrales (desde el contorno) ---
    const geosMuros = [];
    // los muros llegan hasta la cara inferior de la losa superior
    const alturaPerim = nivel.alturaLibre > 0 ? nivel.alturaLibre + GROSOR_LOSA : 0;
    if (alturaPerim > 0) {
      const c = nivel.losa.contorno;
      for (let i = 0; i < c.length; i++) {
        const p1 = c[i], p2 = c[(i + 1) % c.length];
        geosMuros.push(cajaMuro(p1, p2, ESPESOR_PERIMETRO, alturaPerim));
        segs.push({ x1: p1[0], z1: p1[1], x2: p2[0], z2: p2[1] });
      }
    } else {
      // nivel abierto (azotea): el perímetro igual limita el paso
      const c = nivel.losa.contorno;
      for (let i = 0; i < c.length; i++) {
        const p1 = c[i], p2 = c[(i + 1) % c.length];
        segs.push({ x1: p1[0], z1: p1[1], x2: p2[0], z2: p2[1] });
      }
    }

    // --- Muros interiores ---
    for (const muro of nivel.muros) {
      if (muro.altura > 0.2) {
        const h = Math.abs(muro.altura - nivel.alturaLibre) < 0.01 ? muro.altura + GROSOR_LOSA : muro.altura;
        geosMuros.push(cajaMuro(muro.p1, muro.p2, muro.espesor, h));
        segs.push({ x1: muro.p1[0], z1: muro.p1[1], x2: muro.p2[0], z2: muro.p2[1] });
      }
    }
    if (geosMuros.length) {
      const muros = new THREE.Mesh(mergeGeometries(geosMuros), matMuro);
      g.add(muros);
    }

    // --- Bordes de huecos: colisionan (barandas invisibles) ---
    for (const h of nivel.losa.huecos) {
      for (let i = 0; i < h.length; i++) {
        const p1 = h[i], p2 = h[(i + 1) % h.length];
        segs.push({ x1: p1[0], z1: p1[1], x2: p2[0], z2: p2[1] });
      }
    }

    // --- Zonas clicables ---
    for (const zona of nivel.zonas) {
      const geo = extruirPlano(shapeDesdePoligono(zona.poligono), 0.1);
      const mat = new THREE.MeshStandardMaterial({
        color: zona.color, transparent: true, opacity: 0.5,
        emissive: new THREE.Color(zona.color), emissiveIntensity: 0.25,
        roughness: 0.8,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.y = 0.12;
      mesh.userData = { zona, nivelId: nivel.id, nivelNombre: nivel.nombre };
      g.add(mesh);
      zoneMeshes.push(mesh);
    }

    // --- Props ---
    for (const prop of nivel.props ?? []) {
      const matDef = MATERIALS[prop.material] ?? MATERIALS.murosBase;
      if (prop.box) {
        const [a, b] = prop.box; // [[x1,z1,y1],[x2,z2,y2]] — y relativo al piso del nivel
        const geo = new THREE.BoxGeometry(b[0] - a[0], b[2] - a[2], b[1] - a[1]);
        const mesh = new THREE.Mesh(geo, crearMaterial(matDef));
        mesh.position.set((a[0] + b[0]) / 2, (a[2] + b[2]) / 2, (a[1] + b[1]) / 2);
        g.add(mesh);
        if (matDef.emissive) emissives.push({ material: mesh.material, tipo: matDef.animado ?? 'fijo' });
        segs.push({ x1: a[0], z1: a[1], x2: b[0], z2: a[1] });
        segs.push({ x1: b[0], z1: a[1], x2: b[0], z2: b[1] });
        segs.push({ x1: b[0], z1: b[1], x2: a[0], z2: b[1] });
        segs.push({ x1: a[0], z1: b[1], x2: a[0], z2: a[1] });
      } else if (prop.plano) {
        const p = prop.plano; // x1,x2,z fijos; y1,y2 en cotas ABSOLUTAS
        const geo = new THREE.PlaneGeometry(p.x2 - p.x1, p.y2 - p.y1);
        const mesh = new THREE.Mesh(geo, crearMaterial(matDef));
        mesh.position.set((p.x1 + p.x2) / 2, (p.y1 + p.y2) / 2 - nivel.elev, p.z);
        mesh.rotation.y = Math.PI; // mira hacia la calle (−Z)
        g.add(mesh);
        if (matDef.emissive) emissives.push({ material: mesh.material, tipo: matDef.animado ?? 'fijo' });
      } else if (prop.segmentos) {
        for (const s of prop.segmentos) {
          const dx = s.p2[0] - s.p1[0], dz = s.p2[1] - s.p1[1];
          const largo = Math.hypot(dx, dz);
          const geo = new THREE.BoxGeometry(largo, 1.1, 0.05);
          const mesh = new THREE.Mesh(geo, matBaranda);
          mesh.position.set((s.p1[0] + s.p2[0]) / 2, 0.55, (s.p1[1] + s.p2[1]) / 2);
          mesh.rotation.y = -Math.atan2(dz, dx);
          g.add(mesh);
          segs.push({ x1: s.p1[0], z1: s.p1[1], x2: s.p2[0], z2: s.p2[1] });
        }
      }
    }

    colliders[nivel.id] = segs;

    // --- Anclas de luz (a coordenadas de mundo) ---
    lightAnchors[nivel.id] = (nivel.lightAnchors ?? []).map((a) => ({
      pos: new THREE.Vector3(a.pos[0], a.pos[1], a.pos[2]),
      tipo: a.tipo,
    }));

    // --- Etiqueta del nivel (solo modo maqueta) ---
    const etiqueta = etiquetaSprite(nivel.nombre);
    etiqueta.position.set(-1.6, 1.4, 3.2);
    g.add(etiqueta);
    etiquetasNivel.push(etiqueta);
  }

  // --- Contexto: terreno y lote ---
  const suelo = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 160),
    crearMaterial(MATERIALS.terreno)
  );
  suelo.rotation.x = -Math.PI / 2;
  suelo.position.set(LOT.frente / 2, -0.02, LOT.fondo / 2);
  buildingGroup.add(suelo);

  const puntosLote = LOT.poligono.map(([x, z]) => new THREE.Vector3(x, 0.02, z));
  puntosLote.push(puntosLote[0].clone());
  const lote = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(puntosLote),
    new THREE.LineBasicMaterial({ color: 0xf5a623, transparent: true, opacity: 0.5 })
  );
  buildingGroup.add(lote);

  return { buildingGroup, levelGroups, zoneMeshes, colliders, emissives, lightAnchors, etiquetasNivel };
}
