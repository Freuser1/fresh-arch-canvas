const $ = (s, root=document) => root.querySelector(s);
let scene, camera, renderer, controls, raycaster, mouse, tooltip;
let interactives = [];

document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  const status = document.getElementById("formStatus");
  const btn = document.getElementById("fakeSubmit");
  if (btn) btn.addEventListener("click", ()=>{
    status.textContent = "Tack! Ditt meddelande har registrerats (demoläge).";
    setTimeout(()=>status.textContent="", 4000);
  });
});

function init() {
  tooltip = document.getElementById("tooltip");
  const canvas = document.getElementById("scene");

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0e1113);

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;

  camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 1000);
  camera.position.set(6.5, 4.2, 9.5);

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h, false);

  const hemi = new THREE.HemisphereLight(0xbfd4e5, 0x222222, 0.7);
  scene.add(hemi);
  const key = new THREE.DirectionalLight(0xffffff, 0.9);
  key.position.set(5, 10, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xfff0d2, 0.3);
  rim.position.set(-6, 6, -5);
  scene.add(rim);

  const groundMat = new THREE.MeshStandardMaterial({ color: 0x0f1316, metalness: 0.1, roughness: 0.9 });
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), groundMat);
  ground.rotation.x = -Math.PI/2; ground.position.y = -0.01; ground.receiveShadow = true;
  scene.add(ground);

  const bayCount = 6, bayWidth = 1.6, colRadius = 0.12, colHeight = 3.2, spacing = 1.4;
  const stone = new THREE.MeshStandardMaterial({ color: 0xb7a07a, roughness: 0.6, metalness: 0.05 });
  const stoneCool = new THREE.MeshStandardMaterial({ color: 0x8aa1b1, roughness: 0.55, metalness: 0.06 });
  const stoneDark = new THREE.MeshStandardMaterial({ color: 0x6c7b6d, roughness: 0.55, metalness: 0.04 });

  const wall = new THREE.Mesh(new THREE.BoxGeometry(bayCount*spacing + 2, colHeight + 1.2, 0.3), new THREE.MeshStandardMaterial({ color: 0x1a2024, roughness: 0.95 }));
  wall.position.set((bayCount-1)*spacing/2, colHeight/2, -0.15); scene.add(wall);

  const cornice = new THREE.Mesh(new THREE.BoxGeometry(bayCount*spacing + 2.2, 0.25, 0.5), stoneDark);
  cornice.position.set((bayCount-1)*spacing/2, colHeight + 0.6, 0); scene.add(cornice);
  cornice.userData = { label: "Gesims: avslutar fasaden och skyddar mot regn." };
  interactives.push(cornice);

  const colGeo = new THREE.CylinderGeometry(colRadius, colRadius, colHeight, 24);
  for (let i=0; i<bayCount; i++) {
    const x = i * spacing;
    const col = new THREE.Mesh(colGeo, stone); col.position.set(x, colHeight/2, 0); scene.add(col);
    col.userData = { label: `Kolonn ${i+1}: bärande element, h ≈ ${colHeight} m.` }; interactives.push(col);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(bayWidth/2, 0.06, 16, 100, Math.PI), stoneCool);
    arch.rotation.x = Math.PI/2; arch.position.set(x, colHeight - 0.4, 0); scene.add(arch);
    arch.userData = { label: "Rundbåge: fördelar last till kolonnerna." }; interactives.push(arch);
  }

  const grid = new THREE.GridHelper(40, 40, 0x20282c, 0x151a1d); grid.position.y = 0.001; scene.add(grid);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; controls.minDistance = 5; controls.maxDistance = 20;
  controls.target.set((bayCount-1)*spacing/2, colHeight/2, 0);

  raycaster = new THREE.Raycaster(); mouse = new THREE.Vector2();
  canvas.addEventListener("mousemove", onPointerMove);
  canvas.addEventListener("mouseleave", () => tooltip.style.opacity = 0);
  window.addEventListener("resize", onResize);

  animate();
}

function onPointerMove(event) {
  const rect = event.target.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(interactives);
  if (hits.length) {
    const obj = hits[0].object;
    tooltip.textContent = obj.userData.label || "";
    tooltip.style.left = event.clientX + "px";
    tooltip.style.top = event.clientY + "px";
    tooltip.style.opacity = 1;
    document.body.style.cursor = "help";
  } else {
    tooltip.style.opacity = 0;
    document.body.style.cursor = "default";
  }
}

function onResize() {
  const canvas = document.getElementById("scene");
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h; camera.updateProjectionMatrix();
}

function animate() { requestAnimationFrame(animate); controls.update(); renderer.render(scene, camera); }
window.addEventListener("load", init);
