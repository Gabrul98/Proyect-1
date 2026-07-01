// Panel lateral de fichas técnicas (DOM puro).

const el = () => document.getElementById('panel');

export function mostrarFicha(zona, nivelNombre) {
  const p = el();
  const f = zona.ficha || {};
  p.innerHTML = `
    <button class="panel-cerrar" aria-label="Cerrar">×</button>
    <div class="panel-nivel">${nivelNombre}</div>
    <h2 class="panel-titulo">${zona.nombre}</h2>
    <div class="panel-datos">
      <span><strong>${f.m2 ?? '—'}</strong> m²</span>
      ${f.aforo ? `<span><strong>${f.aforo}</strong> pers.</span>` : ''}
    </div>
    <p class="panel-desc">${f.descripcion ?? ''}</p>
    ${f.sonido && f.sonido !== '—' ? `<div class="panel-spec"><h3>Sonido</h3><p>${f.sonido}</p></div>` : ''}
    ${f.luces && f.luces !== '—' ? `<div class="panel-spec"><h3>Iluminación</h3><p>${f.luces}</p></div>` : ''}
  `;
  p.classList.add('abierto');
  document.body.classList.add('panel-abierto');
  p.querySelector('.panel-cerrar').addEventListener('click', ocultarFicha);
}

export function ocultarFicha() {
  el().classList.remove('abierto');
  document.body.classList.remove('panel-abierto');
}
