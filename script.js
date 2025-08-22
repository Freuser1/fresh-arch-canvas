// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// ======== THREE.JS SCENE (full-bleed hero) ========
const root = document.getElementById('three-root');

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
renderer.setSize(root.clientWidth, root.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputColorSpace = THREE.SRGBColorSpace;
root.appendChild(renderer.domElement);

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0d0f10);
scene.fog = new THREE.FogExp2(0x0b0c0d, 0.012);

// Camera
const camera = new THREE.PerspectiveCamera(40, root.clientWidth / root.clientHeight, 0.1, 300);
camera.position.set(0, 6, 18);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance = 6;
controls.maxDistance = 60;
controls.target.set(0, 4, 0);

// Lights
const hemi = new THREE.HemisphereLight(0xdfeff6, 0x101217, 0.55);
scene.add(hemi);

const dirLight = new THREE.DirectionalLight(0xfff7e8, 1.0);
dirLight.position.set(10, 18, 8);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(2048, 2048);
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 80;
dirLight.shadow.camera.top = 20;
dirLight.shadow.camera.bottom = -20;
dirLight.shadow.camera.left = -30;
dirLight.shadow.camera.right = 30;
scene.add(dirLight);

// Ground
const groundMat = new THREE.MeshStandardMaterial({ color: 0x0b0d0e, roughness: 0.95, metalness: 0.0 });
const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.01;
ground.receiveShadow = true;
scene.add(ground);

// ===== Stylised "iconic" classical arch =====
// Colors synced with your legend concept:
const COL = 0xc8b89b; // Kolonner
const ARC = 0x8aa1b1; // Bågar
const ENT = 0x6c7b6d; // Gesims / entablatur

// Materials
const matColumn = new THREE.MeshStandardMaterial({ color: COL, roughness: 0.35, metalness: 0.0 });
const matArch   = new THREE.MeshStandardMaterial({ color: ARC, roughness: 0.35, metalness: 0.0 });
const matEnt    = new THREE.MeshStandardMaterial({ color: ENT, roughness: 0.45, metalness: 0.0 });

// Columns
const columnHeight = 8;
const columnRadius = 0.6;
const columnGeo = new THREE.CylinderGeometry(columnRadius, columnRadius, columnHeight, 48, 1, false);
const baseGeo = new THREE.CylinderGeometry(columnRadius*1.2, columnRadius*1.2, 0.5, 48);
const capGeo  = new THREE.CylinderGeometry(columnRadius*1.15, columnRadius*1.15, 0.4, 48);

function makeColumn(x) {
  const group = new THREE.Group();

  const shaft = new THREE.Mesh(columnGeo, matColumn);
  shaft.castShadow = shaft.receiveShadow = true;
  group.add(shaft);

  const base = new THREE.Mesh(baseGeo, matColumn);
  base.position.y = -columnHeight/2 - 0.25;
  base.castShadow = base.receiveShadow = true;
  group.add(base);

  const cap = new THREE.Mesh(capGeo, matColumn);
  cap.position.y = columnHeight/2 + 0.2;
  cap.castShadow = cap.receiveShadow = true;
  group.add(cap);

  group.position.set(x, columnHeight/2, 0);
  return group;
}

const colLeft  = makeColumn(-4.5);
const colRight = makeColumn( 4.5);
scene.add(colLeft, colRight);

// Entablature (simple block)
const ent = new THREE.Mesh(new THREE.BoxGeometry(10, 0.8, 2.2), matEnt);
ent.position.set(0, columnHeight + 0.6, 0);
ent.castShadow = ent.receiveShadow = true;
scene.add(ent);

// Arch (semi-torus)
const archRadius = 4.5;      // from center to tube center
const archTube   = 0.55;     // thickness
const archGeo = new THREE.TorusGeometry(archRadius, archTube, 48, 160, Math.PI); // 180°
const arch = new THREE.Mesh(archGeo, matArch);
arch.rotation.x = Math.PI / 2;         // stand it up
arch.rotation.z = Math.PI;             // open downward
arch.position.y = columnHeight;        // rest on columns
arch.castShadow = arch.receiveShadow = true;
scene.add(arch);

// Small center plinth just for depth
const plinth = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.3, 1.6), matEnt);
plinth.position.set(0, -0.01 + 0.15, 0);
plinth.castShadow = plinth.receiveShadow = true;
scene.add(plinth);

// Post-processing (subtle bloom)
const composer = new THREE.EffectComposer(renderer);
const renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);
const bloom = new THREE.UnrealBloomPass(new THREE.Vector2(root.clientWidth, root.clientHeight), 0.22, 0.6, 0.2);
bloom.threshold = 0.7;
bloom.strength = 0.5;
bloom.radius = 0.35;
composer.addPass(bloom);

// Resize
function onResize(){
  const w = root.clientWidth;
  const h = root.clientHeight;
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
  composer.setSize(w, h);
}
window.addEventListener('resize', onResize);
onResize();

// Wireframe toggle
let wire = false;
window.addEventListener('keydown', (e)=>{
  if (e.key.toLowerCase() === 'w'){
    wire = !wire;
    [colLeft, colRight, ent, arch, plinth].forEach(obj=>{
      obj.traverse?.(n=>{ if(n.isMesh) n.material.wireframe = wire; });
      if (obj.isMesh) obj.material.wireframe = wire;
    });
  }
});

// Animate
const clock = new THREE.Clock();
function animate(){
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  // gentle breathing light
  dirLight.intensity = 0.9 + Math.sin(t*0.5)*0.1;
  controls.update();
  composer.render();
}
animate();
