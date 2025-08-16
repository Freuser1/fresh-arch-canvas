// script.js (type=module)
import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.160.0/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://unpkg.com/three@0.160.0/examples/jsm/postprocessing/UnrealBloomPass.js';

const canvas = document.getElementById('three-canvas');
const tooltip = document.getElementById('tooltip');
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.physicallyCorrectLights = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0f10);

// Camera & controls
const camera = new THREE.PerspectiveCamera(40, 2, 0.1, 200);
camera.position.set(0, 6, 18);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 6;
controls.maxDistance = 40;
controls.target.set(0, 3.2, 0);

// Lights
const hemi = new THREE.HemisphereLight(0xdfeff6, 0x101217, 0.6);
scene.add(hemi);

const key = new THREE.DirectionalLight(0xfff7e8, 1.0);
key.position.set(8, 20, 10);
key.castShadow = true;
key.shadow.mapSize.set(2048, 2048);
key.shadow.camera.top = 18;
key.shadow.camera.bottom = -18;
key.shadow.camera.left = -30;
key.shadow.camera.right = 30;
key.shadow.camera.near = 1;
key.shadow.camera.far = 80;
scene.add(key);

const fill = new THREE.DirectionalLight(0xd0e6ff, 0.35);
fill.position.set(-10, 6, -12);
scene.add(fill);

// Ground / plinth receiver
const groundMat = new THREE.MeshStandardMaterial({ color: 0x0b0d0e, roughness: 0.95 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;
scene.add(ground);

// Post-processing (bloom for subtle glow on highlights)
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(512, 512), 0.22, 0.6, 0.1);
bloom.threshold = 0.6;
bloom.strength = 0.6;
bloom.radius = 0.4;
composer.addPass(bloom);

// Materials palette
const matStone = new THREE.MeshStandardMaterial({ color: 0xE3DCCA, roughness: 0.52, metalness: 0.02 });
const matSockel = new THREE.MeshStandardMaterial({ color: 0x2b2f32, roughness: 0.9, metalness: 0.03 });
const matRoof = new THREE.MeshStandardMaterial({ color: 0xb3563b, roughness: 0.7, metalness: 0.0 });
const matAccent = new THREE.MeshStandardMaterial({ color: 0xd4b26b, roughness: 0.35, metalness: 0.7, emissive: 0x000000 });

// Optionally load user reference image as decal/texturization if exists
const loader = new THREE.TextureLoader();
let refTexture = null;
loader.load('model/aptartment.glb', (tex) => {
  tex.encoding = THREE.sRGBEncoding;
  refTexture = tex;
}, undefined, () => { /* ignore load error - optional */ });

// Helper: pediment (triangular prism)
function createPediment(width = 4, height = 0.9, depth = 0.7, material = matRoof) {
  const shape = new THREE.Shape();
  shape.moveTo(-width / 2, 0);
  shape.lineTo(width / 2, 0);
  shape.lineTo(0, height);
  shape.closePath();
  const extrudeSettings = { depth: depth, bevelEnabled: false, steps: 1 };
  const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geom.rotateX(-Math.PI / 2);
  geom.translate(0, 0, -depth / 2);
  const mesh = new THREE.Mesh(geom, material);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

// Create a single temple module (columns, base, pediment, arch opening)
function buildTemple(x = 0, options = {}) {
  const group = new THREE.Group();

  const bayWidth = options.bayWidth ?? 4.6;
  const colRadius = options.colRadius ?? 0.32;
  const colHeight = options.colHeight ?? 3.6;
  const spacing = bayWidth;

  // Sockel / base block
  const baseW = bayWidth + 1.4;
  const base = new THREE.Mesh(new THREE.BoxGeometry(baseW, 0.7, 2.2), matSockel);
  base.position.set(0, 0.35, 0);
  base.receiveShadow = true;
  base.castShadow = true;
  group.add(base);

  // Trappor (subtle extruded steps)
  const stepCount = 2;
  for (let s = 0; s < stepCount; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(baseW + (s + 1) * 0.2, 0.18, 2.6 + s * 0.02), matSockel);
    step.position.set(0, 0.18 * (s + 0.5), 0.02 + s * 0.01);
    step.receiveShadow = true;
    group.add(step);
  }

  // Columns: use Cylinder + subtle fluting via baked texture not included — we keep smooth
  const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, colHeight, 40);
  const colPositions = [-bayWidth / 2 + 0.5, bayWidth / 2 - 0.5]; // two columns per opening
  colPositions.forEach((cx, idx) => {
    const column = new THREE.Mesh(colGeo, matStone);
    column.position.set(cx, colHeight / 2 + 0.7, 0);
    column.castShadow = true;
    column.receiveShadow = true;
    column.userData = { type: 'column', name: `Kolonn ${idx + 1}` };
    group.add(column);

    // Kapitäl
    const cap = new THREE.Mesh(new THREE.BoxGeometry(colRadius * 2.2, 0.28, colRadius * 2.2), matAccent);
    cap.position.set(cx, colHeight + 0.84, 0);
    cap.castShadow = true;
    group.add(cap);
  });

  // Arch fill (semi circular) as decorative panel behind
  const archGroup = new THREE.Group();
  const archMat = matStone.clone();
  archMat.color.offsetHSL(0.03, -0.05, -0.03);
  const archRadius = bayWidth / 2 - 0.4;
  const arcGeo = new THREE.TorusGeometry(archRadius, 0.22, 16, 64, Math.PI);
  const arch = new THREE.Mesh(arcGeo, matRoof);
  arch.rotation.x = Math.PI / 2;
  arch.position.set(0, colHeight + 0.05, 0.02);
  arch.castShadow = true;
  arch.receiveShadow = true;
  arch.userData = { type: 'arch', name: 'Rundbåge' };
  archGroup.add(arch);

  // Pediment (triangle roof)
  const ped = createPediment(bayWidth + 0.6, 0.95, 1.05, matRoof);
  ped.position.set(0, colHeight + 1.05, 0);
  ped.castShadow = true;
  ped.receiveShadow = true;
  ped.userData = { type: 'pediment', name: 'Tympanon / gesims' };
  group.add(archGroup);
  group.add(ped);

  // Optional decal from reference texture
  if (refTexture) {
    const wallGeo = new THREE.PlaneGeometry(baseW - 0.3, colHeight, 1, 1);
    const wallMat = new THREE.MeshStandardMaterial({ map: refTexture, roughness: 0.7, metalness: 0.02 });
    const wall = new THREE.Mesh(wallGeo, wallMat);
    wall.position.set(0, colHeight / 2 + 0.7, -0.9);
    wall.receiveShadow = true;
    group.add(wall);
  } else {
    // simple dark wall behind columns
    const wall = new THREE.Mesh(new THREE.BoxGeometry(baseW - 0.3, colHeight, 0.6), matStone);
    wall.position.set(0, colHeight / 2 + 0.7, -0.8);
    wall.receiveShadow = true;
    group.add(wall);
  }

  // small gold trims
  const trim = new THREE.Mesh(new THREE.BoxGeometry(baseW, 0.08, 0.14), matAccent);
  trim.position.set(0, colHeight + 0.45, 0.65);
  group.add(trim);

  // set group position on x axis
  group.position.x = x;
  return group;
}

// create a row of temples
const temples = new THREE.Group();
const count = 4;
const spacingBetween = 7.6;
const startX = -((count - 1) * spacingBetween) / 2;
for (let i = 0; i < count; i++) {
  const t = buildTemple(startX + i * spacingBetween, {});
  temples.add(t);
}
scene.add(temples);

// subtle ambient fog for depth
scene.fog = new THREE.FogExp2(0x0b0c0d, 0.012);

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let hoverObj = null;
let hoverIntensity = 0;

// Keep a set of highlightable meshes for raycast
const highlightables = [];
temples.traverse((c) => {
  if (c.isMesh && c.userData && c.userData.type) {
    highlightables.push(c);
  }
});

// For smooth hover emissive animation: store original emissive and color
const original = new Map();
highlightables.forEach(m => {
  if (!m.material.emissive) m.material.emissive = new THREE.Color(0x000000);
  original.set(m.uuid, { emissive: m.material.emissive.clone(), scale: m.scale.clone() });
});

// Resize helper
function resizeRendererToDisplaySize() {
  const parent = canvas.parentElement;
  const width = parent.clientWidth;
  const height = parent.clientHeight;
  const needResize = canvas.width !== Math.floor(width * renderer.getPixelRatio()) || canvas.height !== Math.floor(height * renderer.getPixelRatio());
  if (needResize) {
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    composer.setSize(width, height);
  }
  return needResize;
}

// Interaction events
function onPointerMove(event) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

  // raycast
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(highlightables, true);
  if (hits.length) {
    const m = hits[0].object;
    if (hoverObj !== m) {
      hoverObj = m;
      tooltip.textContent = m.userData.name || m.userData.type || 'Detalj';
      tooltip.style.opacity = '1';
      tooltip.style.left = event.clientX + 'px';
      tooltip.style.top = event.clientY + 'px';
    } else {
      tooltip.style.left = event.clientX + 'px';
      tooltip.style.top = event.clientY + 'px';
    }
  } else {
    hoverObj = null;
    tooltip.style.opacity = '0';
  }
}

canvas.addEventListener('pointermove', onPointerMove);

// On click: small bounce/scale animation
canvas.addEventListener('click', (e) => {
  // raycast once more
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(highlightables, true);
  if (hits.length) {
    const target = hits[0].object;
    // quick scale pulse
    const start = { s: 1.0 }, end = { s: 1.06 };
    const duration = 220;
    const t0 = performance.now();
    function pulse(now) {
      const t = Math.min(1, (now - t0) / duration);
      const v = start.s + (end.s - start.s) * (1 - Math.cos(t * Math.PI)) / 2;
      target.scale.setScalar(v);
      if (t < 1) requestAnimationFrame(pulse);
      else {
        // back to normal
        const t1 = performance.now();
        const dura2 = 160;
        function back(now2) {
          const tt = Math.min(1, (now2 - t1) / dura2);
          const vv = end.s + (start.s - end.s) * (1 - Math.cos(tt * Math.PI)) / 2;
          target.scale.setScalar(vv);
          if (tt < 1) requestAnimationFrame(back);
        }
        requestAnimationFrame(back);
      }
    }
    requestAnimationFrame(pulse);
  }
});

// animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  // resize handling
  resizeRendererToDisplaySize();

  // update highlight glow
  // raycast to find hovered mesh (also updated from pointer move)
  if (hoverObj) {
    // increase intensity smoothly
    hoverIntensity += (1 - hoverIntensity) * 0.16;
  } else {
    hoverIntensity += (0 - hoverIntensity) * 0.12;
  }
  highlightables.forEach(m => {
    const o = original.get(m.uuid);
    if (!o) return;
    if (m === hoverObj) {
      // emissive gold-ish tint
      m.material.emissive.lerp(new THREE.Color(0x2b200e), hoverIntensity * 0.9);
      const s = 1 + 0.02 * hoverIntensity;
      m.scale.setScalar(s);
    } else {
      m.material.emissive.lerp(o.emissive, 0.12);
      // gently return scale
      m.scale.lerp(o.scale, 0.08);
    }
  });

  controls.update();
  composer.render();
}

animate();

// Clean resize
window.addEventListener('resize', () => {
  resizeRendererToDisplaySize();
});
