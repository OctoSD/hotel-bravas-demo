// Hotel Bravas — Mockup router (adaptado del patrón Tile)
// 4 portales: huésped (phone), limpieza (phone), cocina/salón (tablet), admin (desktop)

const SCREENS = [
  // INTRO / portada
  { id: 'intro',               role: 'intro',    device: 'desktop', title: 'Portada — 4 portales',           icon: '🏨' },

  // HUÉSPED (mobile - propio celular)
  { id: 'huesped-home',        role: 'huesped',  device: 'phone',   title: 'Home — mi habitación',           icon: '🏠' },
  { id: 'huesped-servicios',   role: 'huesped',  device: 'phone',   title: 'Pedir servicios',                icon: '🛎️' },
  { id: 'huesped-menu',        role: 'huesped',  device: 'phone',   title: 'Menú del bar',                   icon: '🍽️' },
  { id: 'huesped-pedidos',     role: 'huesped',  device: 'phone',   title: 'Mis pedidos en vivo',            icon: '📡' },
  { id: 'huesped-review',      role: 'huesped',  device: 'phone',   title: 'Dejar reseña',                   icon: '⭐' },

  // LIMPIEZA (mobile - empleado)
  { id: 'limpieza-tareas',     role: 'limpieza', device: 'phone',   title: 'Habitaciones del día',           icon: '🧹' },
  { id: 'limpieza-habitacion', role: 'limpieza', device: 'phone',   title: 'Habitación — checklist',         icon: '✓' },
  { id: 'limpieza-encurso',    role: 'limpieza', device: 'phone',   title: 'Limpieza en curso',              icon: '⏱️' },

  // COCINA / SALÓN (tablet fija en cocina)
  { id: 'cocina-pedidos',      role: 'cocina',   device: 'tablet',  title: 'Tablero de pedidos',             icon: '📋' },
  { id: 'cocina-detalle',      role: 'cocina',   device: 'tablet',  title: 'Pedido — detalle',               icon: '🍳' },

  // ADMIN (desktop)
  { id: 'admin-dashboard',     role: 'admin',    device: 'desktop', title: 'Dashboard tiempo real',          icon: '📊' },
  { id: 'admin-empleados',     role: 'admin',    device: 'desktop', title: 'Historial por empleado',         icon: '👥' },
  { id: 'admin-huespedes',     role: 'admin',    device: 'desktop', title: 'Historial por huésped',          icon: '🧳' },
  { id: 'admin-stats',         role: 'admin',    device: 'desktop', title: 'Estadísticas',                   icon: '📈' },
];

const ROLE_LABELS = {
  intro:    { label: 'Intro',           emoji: '🏨', hint: 'portal picker' },
  huesped:  { label: 'Huésped',         emoji: '🧳', hint: 'webapp móvil del huésped' },
  limpieza: { label: 'Limpieza',        emoji: '🧹', hint: 'webapp móvil del empleado de limpieza' },
  cocina:   { label: 'Cocina / Salón',  emoji: '🍽️', hint: 'tablet fija en cocina' },
  admin:    { label: 'Admin',           emoji: '🧑‍💼', hint: 'panel web del gerente' },
};

const DEVICE_LABELS = {
  phone:   { label: 'MÓVIL',   className: 'phone' },
  tablet:  { label: 'TABLET',  className: 'tablet' },
  desktop: { label: 'DESKTOP', className: 'desktop' },
};

// ---------- Render sidebar ----------
function renderSidebar() {
  const nav = document.getElementById('nav-list');
  const groups = {};
  SCREENS.forEach(s => {
    if (!groups[s.role]) groups[s.role] = [];
    groups[s.role].push(s);
  });

  const order = ['intro', 'huesped', 'limpieza', 'cocina', 'admin'];
  let html = '';
  order.forEach(role => {
    if (!groups[role]) return;
    const meta = ROLE_LABELS[role];
    html += `<div class="sidebar-section">
      <div class="sidebar-section-title">${meta.emoji} ${meta.label}</div>`;
    groups[role].forEach(s => {
      const dev = DEVICE_LABELS[s.device];
      const badge = `<span class="sidebar-link-badge ${dev.className}">${dev.label}</span>`;
      html += `<div class="sidebar-link" data-screen="${s.id}">
        <span>${s.icon}</span>
        <span>${s.title}</span>
        ${badge}
      </div>`;
    });
    html += `</div>`;
  });

  nav.innerHTML = html;
  nav.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      loadScreen(link.dataset.screen);
      document.getElementById('sidebar').classList.remove('open');
    });
  });
}

// ---------- Switch active frame ----------
function activateFrame(device) {
  ['phone', 'tablet', 'desktop'].forEach(d => {
    const el = document.getElementById('frame-' + d);
    if (el) el.style.display = (d === device) ? '' : 'none';
  });
}

// ---------- Load screen ----------
async function loadScreen(id) {
  const meta = SCREENS.find(s => s.id === id);
  if (!meta) return;

  // Activar link
  document.querySelectorAll('.sidebar-link').forEach(l => {
    l.classList.toggle('active', l.dataset.screen === id);
  });

  // Topbar title
  const title = document.getElementById('stage-title');
  const dev = DEVICE_LABELS[meta.device];
  title.innerHTML = `${meta.icon} ${meta.title} <small>${dev.label}</small>`;

  // Switch device frame
  activateFrame(meta.device);

  // URL hash
  if (location.hash !== '#' + id) history.replaceState(null, '', '#' + id);

  const container = document.getElementById('screen-' + meta.device);
  container.innerHTML = '<div class="phone-loading">Cargando pantalla…</div>';

  try {
    const resp = await fetch(`screens/${id}.html`, { cache: 'no-store' });
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    const html = await resp.text();

    const infoMatch = html.match(/<template id="info"[^>]*>([\s\S]*?)<\/template>/i);
    const infoHtml = infoMatch ? infoMatch[1] : null;

    const body = html.replace(/<template id="info"[^>]*>[\s\S]*?<\/template>/i, '');
    container.innerHTML = body.trim();

    renderInfoDrawer(meta, infoHtml);
    attachScreenBehaviors(container);
  } catch (err) {
    container.innerHTML = `<div class="phone-error">
      <p>No se pudo cargar <strong>${id}</strong>.</p>
      <p style="font-size:12px;margin-top:8px">${err.message}</p>
      <p style="font-size:12px;margin-top:12px;color:#64748B">
        Si estás abriendo con <code>file://</code>, Chrome bloquea <code>fetch</code> local.
        Serví con <code>python3 -m http.server 8080</code> dentro de mockup/.
      </p>
    </div>`;
    showLocalBanner();
  }
}

// ---------- Dynamic behaviors ----------
function attachScreenBehaviors(container) {
  // Navegación cross-screen desde dentro de las pantallas
  container.querySelectorAll('[data-goto]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      loadScreen(el.dataset.goto);
    });
  });

  // Checklist rows: tocar para marcar/desmarcar
  container.querySelectorAll('.checklist-row[data-togglable]').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('done');
    });
  });

  // Qty counters
  container.querySelectorAll('.qty-counter').forEach(c => {
    const val = c.querySelector('.qty-val');
    const btns = c.querySelectorAll('button');
    btns[0]?.addEventListener('click', () => {
      let n = parseInt(val.textContent, 10) || 0;
      if (n > 0) val.textContent = n - 1;
    });
    btns[1]?.addEventListener('click', () => {
      let n = parseInt(val.textContent, 10) || 0;
      val.textContent = n + 1;
    });
  });
}

// ---------- Info drawer ----------
function renderInfoDrawer(meta, infoHtml) {
  const d = document.getElementById('info-drawer');
  const dev = DEVICE_LABELS[meta.device];
  const roleMeta = ROLE_LABELS[meta.role];
  const badge = `<span class="info-badge ${dev.className}">${dev.label}</span>`;
  const body = infoHtml || `<p>Pantalla sin descripción.</p>`;

  d.innerHTML = `
    <button class="info-drawer-close" id="info-close">×</button>
    <div class="info-sub">${roleMeta.emoji} ${roleMeta.label} · ${badge}</div>
    <h3>${meta.title}</h3>
    ${body}
  `;
  d.classList.add('open');
  document.getElementById('info-close').addEventListener('click', () => d.classList.remove('open'));
}

function showLocalBanner() {
  const b = document.getElementById('local-banner');
  if (b) b.classList.add('show');
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  if (location.protocol === 'file:') showLocalBanner();

  const initial = (location.hash || '').replace('#', '') || 'intro';
  loadScreen(initial);

  document.getElementById('mobile-nav-btn').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // ← / → entre pantallas
  document.addEventListener('keydown', e => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    const active = document.querySelector('.sidebar-link.active');
    const idx = SCREENS.findIndex(s => s.id === active?.dataset.screen);
    if (e.key === 'ArrowRight' && idx < SCREENS.length - 1) loadScreen(SCREENS[idx + 1].id);
    if (e.key === 'ArrowLeft' && idx > 0) loadScreen(SCREENS[idx - 1].id);
  });
});

window.addEventListener('hashchange', () => {
  const id = location.hash.replace('#', '');
  if (id) loadScreen(id);
});
