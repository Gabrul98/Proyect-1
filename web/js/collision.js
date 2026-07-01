// Colisión 2D en planta: círculo del jugador vs. segmentos de muro.
// Los segmentos son {x1, z1, x2, z2}. Resolución por empuje iterativo.

export function resolverColision(px, pz, radio, segmentos) {
  let x = px, z = pz;
  for (let pasada = 0; pasada < 2; pasada++) {
    for (const s of segmentos) {
      const dx = s.x2 - s.x1, dz = s.z2 - s.z1;
      const largo2 = dx * dx + dz * dz;
      let t = largo2 > 0 ? ((x - s.x1) * dx + (z - s.z1) * dz) / largo2 : 0;
      t = Math.max(0, Math.min(1, t));
      const cx = s.x1 + t * dx, cz = s.z1 + t * dz;
      let ex = x - cx, ez = z - cz;
      const d = Math.hypot(ex, ez);
      if (d < radio) {
        if (d < 1e-6) { ex = -dz; ez = dx; const n = Math.hypot(ex, ez) || 1; ex /= n; ez /= n; }
        else { ex /= d; ez /= d; }
        const empuje = radio - d;
        x += ex * empuje;
        z += ez * empuje;
      }
    }
  }
  return [x, z];
}

// ¿El punto (x,z) está dentro del AABB [xmin, zmin, xmax, zmax]?
export function dentroAABB(x, z, aabb) {
  return x >= aabb[0] && x <= aabb[2] && z >= aabb[1] && z <= aabb[3];
}
