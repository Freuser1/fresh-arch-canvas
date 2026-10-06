/* =========================================================
   Sky View Portfolio — main.js
   Three.js-scen, GLTF-laddning, molnanimationer, raycasting,
   kameraövergångar (GSAP) och UI-händelser.
   ========================================================= */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Sätts så fort three.js-modulen importerats framgångsrikt. En watchdog i
// index.html visar ett fel om CDN:en är blockerad och denna rad aldrig hinner köra.
window.__skyviewReady = true;

/* ---------------------------------------------------------
   1. KONFIGURATION & PROJEKTDATA
   Byt ut texterna nedan mot dina egna projekt. Nyckeln måste
   matcha objektnamnet i Blender (interactive_...).
   --------------------------------------------------------- */
const MODEL_URL = '.pdf/skyview/models/scene.glb';

const PROJECTS = {
  interactive_stadshuset: {
    landmark: 'Examensarbete 2026',
    title: 'Parkering i befintlig bebyggelse',
    subtitle: 'Examensarbete på grundnivå, 15 hp, inom samhällsbyggnad',
    year: '2026',
    role: 'Författare',
    client: 'KTH — Byggteknik och design',
    accent: '#C8674F',
    image: '',
    description: `
      <p>Hur parkering kan lösas i redan byggd miljö — en fråga om begränsad yta och tillgänglighet,
      där nya funktioner ska passa in utan att bygga nytt.</p>`,
    tags: ['Examensarbete', 'Samhällsbyggnad', 'Parkering'],
    links: [
      { label: 'Öppna rapport (PDF)', url: '../pdfs/Parkering%20i%20befintlig%20bebyggelse%20(2).pdf' },
    ],
  },

  interactive_sofiakyrkan: {
    landmark: 'Projekt 1',
    title: 'Portal & renderingar',
    subtitle: 'Schematisk portal samt interiör- och utemiljörenderingar',
    year: '—',
    role: 'Projektering',
    client: 'KTH — Byggteknik och design',
    accent: '#5E9E8C',
    image: '',
    description: `
      <p>Tidigt skissarbete kring entré och portal, tillsammans med två renderade vyer —
      interiören och utemiljön.</p>`,
    tags: ['Skiss', 'Rendering', 'Portal'],
    links: [
      { label: 'Schematisk portal (PDF)', url: '../pdfs/verk_01_portal.pdf' },
      { label: 'Rendering — interiör', url: '../pdfs/baren%20(1).jpg' },
      { label: 'Rendering — utemiljö', url: '../pdfs/Utomhus%20(1).jpg' },
    ],
  },

  interactive_adolffredrik: {
    landmark: 'Projekt 2',
    title: 'Konstruktion & ROT',
    subtitle: 'Projektering och ombyggnad i grupp',
    year: '—',
    role: 'Grupparbete',
    client: 'KTH — Byggteknik och design',
    accent: '#D9993A',
    image: '',
    description: `
      <p>Grupparbete i projekt 2 — samordning, konstruktion och redovisning — samt ett ROT-projekt
      om ombyggnad av en befintlig byggnad.</p>`,
    tags: ['Konstruktion', 'ROT', 'Grupparbete'],
    links: [
      { label: 'Projekt 2:1 (PDF)', url: '../pdfs/AF1752grupp7.pdf' },
      { label: 'Projekt 2:2 — ROT (PDF)', url: '../pdfs/ProjROT2Grupp7%20(1).pdf' },
    ],
  },
};
const ORDER = Object.keys(PROJECTS);

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = window.matchMedia('(hover: none)').matches;
const MOBILE_BP = 820;

/* GSAP laddas som klassiskt script – fallback om CDN:en blockeras. */
const gsap = window.gsap ?? {
  to(target, vars) {
    const { duration, ease, onUpdate, onComplete, overwrite, delay, ...props } = vars;
    Object.assign(target, props); onUpdate?.(); onComplete?.();
  },
  killTweensOf() {},
};

/* ---------------------------------------------------------
   2. DOM-REFERENSER
   --------------------------------------------------------- */
const $ = (sel) => document.querySelector(sel);
const canvas = $('#scene');
const loaderEl = $('#loader');
const loaderBar = $('#loader-progress');
const loaderMsg = $('#loader-msg');
const tooltip = $('#tooltip');
const tooltipName = $('#tooltip-name');
const pinsEl = $('#pins');
const hint = $('#hint');
const modal = $('#project-modal');
const cvPanel = $('#cv-panel');
const projectsToggle = $('#projects-toggle');
const projectsMenu = $('#projects-menu');

/* ---------------------------------------------------------
   3. RENDERER, SCEN, LJUS
   --------------------------------------------------------- */
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, isTouch ? 1.75 : 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x000000, 0); // transparent => CSS-gradienten syns som himmel

const scene = new THREE.Scene();
// Dis mot horisonten i varm solnedgångston
scene.fog = new THREE.Fog(0xf3d9d0, 135, 215);

// Mjukt himmelsljus (blått uppifrån, varmt underifrån)
const hemi = new THREE.HemisphereLight(0xd3e2ff, 0xf7c9a8, 1.35);
scene.add(hemi);

// Låg solnedgångssol => långa skuggor
const sun = new THREE.DirectionalLight(0xffcfa0, 2.4);
sun.position.set(38, 30, -26);
sun.castShadow = true;
sun.shadow.mapSize.set(isTouch ? 1024 : 2048, isTouch ? 1024 : 2048);
Object.assign(sun.shadow.camera, { left: -42, right: 42, top: 42, bottom: -42, near: 1, far: 140 });
sun.shadow.camera.updateProjectionMatrix();
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.03;
scene.add(sun, sun.target);

// Svagt kallt motljus som ger konturer
const rim = new THREE.DirectionalLight(0xbcd0ff, 0.5);
rim.position.set(-30, 20, 30);
scene.add(rim);

/* ---------------------------------------------------------
   4. ISOMETRISK KAMERA + KONTROLLER
   --------------------------------------------------------- */
const FIT = { height: 36, width: 44 };              // världsenheter som ska rymmas vid zoom 1
const HOME = {
  target: new THREE.Vector3(0, 2.5, 0),
  polar: THREE.MathUtils.degToRad(52),              // 0 = rakt uppifrån
  azimuth: THREE.MathUtils.degToRad(45),            // klassisk isometrisk vinkel
  distance: 150,
  zoom: 1,
};

const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 600);

function frustumHeight() {
  const aspect = window.innerWidth / window.innerHeight;
  return Math.max(FIT.height, FIT.width / aspect);    // passa bredden på smala skärmar
}
function updateFrustum() {
  const h = frustumHeight();
  const w = h * (window.innerWidth / window.innerHeight);
  camera.left = -w / 2; camera.right = w / 2;
  camera.top = h / 2;   camera.bottom = -h / 2;
  camera.updateProjectionMatrix();
}
updateFrustum();
camera.position.setFromSphericalCoords(HOME.distance, HOME.polar, HOME.azimuth).add(HOME.target);
camera.zoom = HOME.zoom;
camera.lookAt(HOME.target);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.copy(HOME.target);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.enablePan = false;
controls.rotateSpeed = 0.55;
controls.minPolarAngle = THREE.MathUtils.degToRad(30);
controls.maxPolarAngle = THREE.MathUtils.degToRad(64);
controls.minZoom = 0.7;
controls.maxZoom = 3.6;
controls.autoRotate = !reducedMotion;
controls.autoRotateSpeed = 0.22;
controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
controls.update();

let userHasInteracted = false;
controls.addEventListener('start', () => {
  userHasInteracted = true;
  controls.autoRotate = false;
  hideHint();
});

/* ---------------------------------------------------------
   5. LADDA .GLB
   --------------------------------------------------------- */
const state = {
  mixer: null,
  interactive: [],          // rot-objekt för landmärken
  byId: {},
  hovered: null,
  project: null,            // aktivt projekt-id
  homeView: null,           // kameraläget innan inzoomning
  tweening: false,
  pointer: { x: 0, y: 0, inside: false, type: 'mouse' },
};
const GLOW_COLOR = new THREE.Color('#ffb37a');

const loader = new GLTFLoader();
loader.load(
  MODEL_URL,
  onModelLoaded,
  (e) => {
    if (e.lengthComputable) loaderBar.style.width = `${Math.round((e.loaded / e.total) * 100)}%`;
  },
  (err) => {
    console.error(err);
    loaderBar.style.width = '100%';
    const fileHint = location.protocol === 'file:'
      ? 'Sidan öppnades via <code>file://</code>. Starta en lokal server, t.ex. <code>python3 -m http.server</code>.'
      : 'Kör <code>blender_generate_scene.py</code> i Blender och lägg filen i <code>models/scene.glb</code>.';
    loaderMsg.innerHTML = `Kunde inte ladda 3D-scenen. ${fileHint}`;
  }
);

function onModelLoaded(gltf) {
  const world = gltf.scene;
  scene.add(world);

  world.traverse((o) => {
    if (!o.isMesh) return;
    o.castShadow = !o.name.startsWith('cloud_sea');
    o.receiveShadow = true;
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    mats.forEach((m) => {
      if (m.name?.includes('cloud')) { m.roughness = 1; m.metalness = 0; }
    });
  });

  // Landmärken: klona material så glöd bara påverkar det hovrade objektet
  for (const id of ORDER) {
    const root = world.getObjectByName(id);
    if (!root) { console.warn(`Hittade inte "${id}" i ${MODEL_URL}`); continue; }
    setupInteractive(root, id);
  }

  // Molnanimationer i loop
  if (gltf.animations.length) {
    state.mixer = new THREE.AnimationMixer(world);
    gltf.animations.forEach((clip) => {
      const action = state.mixer.clipAction(clip);
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    });
  }

  buildPins();
  buildProjectsMenu();

  loaderBar.style.width = '100%';
  // Göm den statiska fallbacken när 3D-scenen är klar.
  const fallbackEl = document.getElementById('fallback');
  if (fallbackEl) fallbackEl.style.display = 'none';
  setTimeout(() => loaderEl.classList.add('is-done'), 350);
  introAnimation();
  openFromHash();
}

function setupInteractive(root, id) {
  const mats = [];
  root.traverse((o) => {
    if (!o.isMesh) return;
    o.material = Array.isArray(o.material) ? o.material.map((m) => m.clone()) : o.material.clone();
    (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
      mats.push({
        mat: m,
        baseEmissive: m.emissive.clone(),
        baseIntensity: m.emissiveIntensity,
        glowable: m.emissive.getHex() === 0x000000,   // fönster m.m. glöder redan
      });
    });
  });

  const box = new THREE.Box3().setFromObject(root);
  root.userData.portfolio = {
    id,
    mats,
    glow: { v: 0 },
    baseScale: root.scale.clone(),
    basePos: root.position.clone(),
    top: new THREE.Vector3((box.min.x + box.max.x) / 2, box.max.y + 0.8, (box.min.z + box.max.z) / 2),
    box,
  };
  state.interactive.push(root);
  state.byId[id] = root;
}

function introAnimation() {
  const from = HOME.zoom * 0.75;
  camera.zoom = from;
  camera.updateProjectionMatrix();
  gsap.to(camera, {
    zoom: HOME.zoom,
    duration: reducedMotion ? 0.01 : 2.4,
    ease: 'power3.out',
    onUpdate: () => camera.updateProjectionMatrix(),
  });
}

/* ---------------------------------------------------------
   6. HOVER & GLÖD
   --------------------------------------------------------- */
const raycaster = new THREE.Raycaster();
const ndc = new THREE.Vector2();

function pick(clientX, clientY) {
  if (!state.interactive.length) return null;
  ndc.set((clientX / window.innerWidth) * 2 - 1, -(clientY / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(state.interactive, true);
  return hits.length ? findInteractiveRoot(hits[0].object) : null;
}

function findInteractiveRoot(obj) {
  // GLTFLoader kan lägga meshar under en Group (flera material) – gå uppåt till rot-noden
  let o = obj;
  while (o) {
    if (o.userData.portfolio) return o;
    o = o.parent;
  }
  return null;
}

function applyGlow(root) {
  const { mats, glow } = root.userData.portfolio;
  for (const m of mats) {
    if (m.glowable) {
      m.mat.emissive.copy(GLOW_COLOR);
      m.mat.emissiveIntensity = glow.v * 0.45;
    } else {
      m.mat.emissiveIntensity = m.baseIntensity * (1 + glow.v * 0.8);
    }
  }
}

function setHighlight(root, on, { lift = true } = {}) {
  const p = root.userData.portfolio;
  const s = on ? 1.06 : 1;
  const d = reducedMotion ? 0.01 : 0.55;
  gsap.to(root.scale, {
    x: p.baseScale.x * s, y: p.baseScale.y * s, z: p.baseScale.z * s,
    duration: d, ease: on ? 'back.out(2.2)' : 'power2.out', overwrite: 'auto',
  });
  gsap.to(root.position, {
    y: p.basePos.y + (on && lift ? 0.35 : 0),
    duration: d, ease: 'power2.out', overwrite: 'auto',
  });
  gsap.to(p.glow, {
    v: on ? 1 : 0, duration: d * 0.9, ease: 'power2.out', overwrite: 'auto',
    onUpdate: () => applyGlow(root),
  });
}

function setHovered(root) {
  if (root === state.hovered) return;
  const prev = state.hovered;
  state.hovered = root;

  // Släpp förra – men behåll markeringen om det är det öppna projektet
  if (prev && prev.userData.portfolio.id !== state.project) setHighlight(prev, false);
  if (root && root.userData.portfolio.id !== state.project) setHighlight(root, true);

  document.body.classList.toggle('is-hovering', !!root);
  canvas.style.cursor = root ? 'pointer' : '';
  if (root) {
    tooltipName.textContent = PROJECTS[root.userData.portfolio.id].landmark;
    tooltip.classList.add('is-visible');
    controls.autoRotate = false;
  } else {
    tooltip.classList.remove('is-visible');
    if (!userHasInteracted && !state.project && !reducedMotion) controls.autoRotate = true;
  }
  pinsEl.querySelectorAll('.pin').forEach((pin) =>
    pin.classList.toggle('is-active', root?.userData.portfolio.id === pin.dataset.id));
}

function updateHover() {
  // Körs en gång per frame (inte per mousemove) – billigt och fångar även autorotation
  if (state.pointer.type !== 'mouse' || !state.pointer.inside || state.tweening) {
    if (state.hovered && state.pointer.type !== 'mouse') setHovered(null);
    return;
  }
  setHovered(pick(state.pointer.x, state.pointer.y));
  if (state.hovered) {
    tooltip.style.left = `${state.pointer.x}px`;
    tooltip.style.top = `${state.pointer.y}px`;
  }
}

/* ---------------------------------------------------------
   7. KLICK => ZOOMA IN + ÖPPNA MODAL
   --------------------------------------------------------- */
let down = null;

canvas.addEventListener('pointermove', (e) => {
  state.pointer.x = e.clientX;
  state.pointer.y = e.clientY;
  state.pointer.type = e.pointerType;
  state.pointer.inside = true;
});
canvas.addEventListener('pointerleave', () => {
  state.pointer.inside = false;
  setHovered(null);
});
canvas.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY };
  state.pointer.type = e.pointerType;
  closeProjectsMenu();
});
canvas.addEventListener('pointerup', (e) => {
  if (!down) return;
  const moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
  down = null;
  if (moved > 6) return;                     // det var en dragning, inte ett klick
  const root = pick(e.clientX, e.clientY);
  if (root) openProject(root.userData.portfolio.id);
  else if (state.project) closeProject();
});

const tmpV = new THREE.Vector3();

function focusCamera(root, onDone) {
  const p = root.userData.portfolio;
  const box = p.box;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  center.y = box.min.y + size.y * 0.45;

  // Behåll nuvarande betraktningsvinkel, flytta bara mål + zoom
  const offset = camera.position.clone().sub(controls.target);
  const fh = frustumHeight();
  const extent = Math.max(size.y * 1.15, Math.hypot(size.x, size.z) * 0.9);
  const zoom = THREE.MathUtils.clamp((fh * 0.5) / extent, 1.4, 3.6);

  // Förskjut så att landmärket inte hamnar bakom modalen
  camera.updateMatrixWorld();
  const right = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 0);
  const up = new THREE.Vector3().setFromMatrixColumn(camera.matrixWorld, 1);
  const worldPerPx = fh / zoom / window.innerHeight;
  const target = center.clone();
  if (window.innerWidth > MOBILE_BP) {
    target.addScaledVector(right, (modal.offsetWidth / 2 + 12) * worldPerPx);
  } else {
    target.addScaledVector(up, -(modal.offsetHeight / 2) * worldPerPx);
  }

  tweenCamera(target, target.clone().add(offset), zoom, onDone);
}

function tweenCamera(target, position, zoom, onDone) {
  state.tweening = true;
  controls.enabled = false;
  const duration = reducedMotion ? 0.01 : 1.6;
  const ease = 'power3.inOut';
  gsap.killTweensOf([controls.target, camera.position, camera]);
  gsap.to(controls.target, { x: target.x, y: target.y, z: target.z, duration, ease });
  gsap.to(camera.position, { x: position.x, y: position.y, z: position.z, duration, ease });
  gsap.to(camera, {
    zoom, duration, ease,
    onUpdate: () => { camera.updateProjectionMatrix(); camera.lookAt(controls.target); },
    onComplete: () => {
      state.tweening = false;
      camera.lookAt(controls.target);
      onDone?.();
    },
  });
}

function openProject(id) {
  const root = state.byId[id];
  const data = PROJECTS[id];
  if (!data) return;

  closeCV({ restoreFocus: false });
  closeProjectsMenu();
  hideHint();
  controls.autoRotate = false;

  // Spara hemvyn första gången vi zoomar in
  if (!state.project) {
    state.homeView = {
      target: controls.target.clone(),
      position: camera.position.clone(),
      zoom: camera.zoom,
    };
  }

  // Avmarkera tidigare projekt
  const prevRoot = state.project && state.byId[state.project];
  state.project = id;
  if (prevRoot && prevRoot !== root) setHighlight(prevRoot, false);

  fillModal(id, data);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  pinsEl.querySelectorAll('.pin').forEach((p) => p.classList.add('is-hidden'));
  setHovered(null);

  if (root) {
    setHighlight(root, true, { lift: false });
    // Vänta en frame så att modalens mått finns innan vi räknar förskjutning
    requestAnimationFrame(() => focusCamera(root));
  }
  history.replaceState(null, '', `#${id.replace('interactive_', '')}`);
  setTimeout(() => modal.querySelector('[data-close="project"]').focus({ preventScroll: true }), 50);
}

function closeProject() {
  if (!state.project) return;
  const root = state.byId[state.project];
  const lastId = state.project;
  state.project = null;
  if (root) setHighlight(root, false);

  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  pinsEl.querySelectorAll('.pin').forEach((p) => p.classList.remove('is-hidden'));
  history.replaceState(null, '', location.pathname + location.search);

  const home = state.homeView ?? { target: HOME.target, position: camera.position.clone(), zoom: HOME.zoom };
  tweenCamera(home.target, home.position, home.zoom, () => {
    controls.enabled = !cvPanel.classList.contains('is-open');
  });

  // Återställ fokus till hotspot för tangentbordsanvändare
  pinsEl.querySelector(`[data-id="${lastId}"]`)?.focus({ preventScroll: true });
}

function fillModal(id, data) {
  const idx = ORDER.indexOf(id);
  modal.style.setProperty('--accent', data.accent);
  $('#pm-index').textContent = `${String(idx + 1).padStart(2, '0')} / ${String(ORDER.length).padStart(2, '0')}`;
  $('#pm-landmark').textContent = data.landmark;
  $('#pm-title').textContent = data.title;
  $('#pm-subtitle').textContent = data.subtitle;
  $('#pm-year').textContent = data.year;
  $('#pm-role').textContent = data.role;
  $('#pm-client').textContent = data.client;
  $('#pm-description').innerHTML = data.description;   // egen, betrodd HTML från PROJECTS

  const tags = $('#pm-tags');
  tags.replaceChildren(...data.tags.map((t) => Object.assign(document.createElement('li'), { textContent: t })));

  const links = $('#pm-links');
  links.replaceChildren(...data.links.map((l, i) => {
    const a = document.createElement('a');
    a.className = i === 0 ? 'btn' : 'btn btn--ghost';
    a.href = l.url;
    a.textContent = l.label;
    if (/^https?:/.test(l.url)) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  }));

  const hero = $('#pm-hero');
  hero.classList.toggle('has-image', !!data.image);
  hero.style.setProperty('--hero-img', data.image ? `url("${data.image}")` : 'none');

  modal.querySelector('.project-modal__body').scrollTop = 0;
}

$('#pm-next').addEventListener('click', () => {
  const next = ORDER[(ORDER.indexOf(state.project) + 1) % ORDER.length];
  openProject(next);
});

/* ---------------------------------------------------------
   8. HOTSPOTS (HTML-knappar som följer landmärkena)
   Ger upptäckbarhet på mobil och tangentbordsåtkomst.
   --------------------------------------------------------- */
function buildPins() {
  pinsEl.replaceChildren(...state.interactive.map((root) => {
    const id = root.userData.portfolio.id;
    const btn = document.createElement('button');
    btn.className = 'pin';
    btn.dataset.id = id;
    btn.setAttribute('aria-label', `Öppna projekt: ${PROJECTS[id].title} (${PROJECTS[id].landmark})`);
    btn.innerHTML = `<span class="pin__dot" aria-hidden="true"></span><span class="pin__label">${PROJECTS[id].landmark}</span>`;
    btn.addEventListener('click', () => openProject(id));
    btn.addEventListener('mouseenter', () => setHighlight(root, true));
    btn.addEventListener('mouseleave', () => { if (state.project !== id && state.hovered !== root) setHighlight(root, false); });
    return btn;
  }));
}

function updatePins() {
  for (const pin of pinsEl.children) {
    const root = state.byId[pin.dataset.id];
    tmpV.copy(root.userData.portfolio.top).project(camera);
    const x = (tmpV.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-tmpV.y * 0.5 + 0.5) * window.innerHeight;
    pin.style.transform = `translate(${x - 11}px, ${y - 11}px)`;
  }
}

/* ---------------------------------------------------------
   9. NAVIGERING: Projekt-dropdown, CV, Kontakt
   --------------------------------------------------------- */
function buildProjectsMenu() {
  projectsMenu.replaceChildren(...ORDER.map((id, i) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');
    btn.innerHTML = `
      <span class="dd-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="dd-text"><strong>${PROJECTS[id].title}</strong><small>${PROJECTS[id].landmark}</small></span>`;
    btn.addEventListener('click', () => openProject(id));
    li.append(btn);
    return li;
  }));
}

function openProjectsMenu() {
  projectsMenu.hidden = false;
  projectsToggle.setAttribute('aria-expanded', 'true');
}
function closeProjectsMenu() {
  projectsMenu.hidden = true;
  projectsToggle.setAttribute('aria-expanded', 'false');
}
projectsToggle.addEventListener('click', (e) => {
  e.stopPropagation();
  projectsMenu.hidden ? openProjectsMenu() : closeProjectsMenu();
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav__dropdown')) closeProjectsMenu();
});

let cvReturnFocus = null;
function openCV({ scrollTo } = {}) {
  closeProjectsMenu();
  if (state.project) closeProject();
  cvReturnFocus = document.activeElement;
  cvPanel.classList.add('is-open');
  cvPanel.setAttribute('aria-hidden', 'false');
  const sheet = cvPanel.querySelector('.cv__sheet');
  sheet.scrollTop = 0;
  controls.enabled = false;
  setTimeout(() => {
    sheet.focus({ preventScroll: true });
    if (scrollTo) $(scrollTo)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }, 80);
}
function closeCV({ restoreFocus = true } = {}) {
  if (!cvPanel.classList.contains('is-open')) return;
  cvPanel.classList.remove('is-open');
  cvPanel.setAttribute('aria-hidden', 'true');
  if (!state.tweening && !state.project) controls.enabled = true;
  if (restoreFocus) cvReturnFocus?.focus?.({ preventScroll: true });
}

$('#cv-open').addEventListener('click', () => openCV());
$('#contact-open').addEventListener('click', () => openCV({ scrollTo: '#cv-contact' }));
$('#brand-home').addEventListener('click', (e) => { e.preventDefault(); closeCV(); closeProject(); });

document.querySelectorAll('[data-close="cv"]').forEach((el) => el.addEventListener('click', () => closeCV()));
document.querySelectorAll('[data-close="project"]').forEach((el) => el.addEventListener('click', closeProject));

// Fokusfälla i CV-dialogen + Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!projectsMenu.hidden) { closeProjectsMenu(); projectsToggle.focus(); return; }
    if (cvPanel.classList.contains('is-open')) { closeCV(); return; }
    if (state.project) { closeProject(); return; }
  }
  if (e.key === 'Tab' && cvPanel.classList.contains('is-open')) {
    const focusables = cvPanel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// Djuplänkning: /#stadshuset öppnar projektet direkt
function openFromHash() {
  const key = location.hash.slice(1);
  if (key && PROJECTS[`interactive_${key}`]) setTimeout(() => openProject(`interactive_${key}`), 600);
}

let hintTimer = setTimeout(hideHint, 9000);
function hideHint() {
  clearTimeout(hintTimer);
  hint.classList.add('is-hidden');
}

/* ---------------------------------------------------------
   10. RESIZE & RENDERLOOP
   --------------------------------------------------------- */
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  updateFrustum();
});

const clock = new THREE.Clock();
function loop() {
  const dt = Math.min(clock.getDelta(), 0.05);
  state.mixer?.update(dt);                 // molnens loop-animationer
  if (!state.tweening) controls.update();  // under GSAP-tweens styr vi kameran själva
  updateHover();
  if (pinsEl.children.length) updatePins();
  renderer.render(scene, camera);
}
renderer.setAnimationLoop(loop);

// Pausa när fliken är dold (sparar batteri)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { renderer.setAnimationLoop(null); clock.stop(); }
  else { clock.start(); renderer.setAnimationLoop(loop); }
});