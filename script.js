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

// script.js
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f4f0);

// Kamera
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 20);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('facade-canvas').appendChild(renderer.domElement);

// Ljus
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Material
const stoneMaterial = new THREE.MeshStandardMaterial({ color: 0xddd7c8 });
const accentMaterial = new THREE.MeshStandardMaterial({ color: 0xc4b89c });

// ===== Skapa fasad =====

// Basvägg
const wall = new THREE.Mesh(new THREE.BoxGeometry(18, 10, 1), stoneMaterial);
wall.position.set(0, 5, -0.6);
scene.add(wall);

// Kolonner (3 st)
for (let i = -6; i <= 6; i += 6) {
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 8, 32), stoneMaterial);
  column.position.set(i, 4, 0);
  scene.add(column);

  const capital = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 1.2), accentMaterial);
  capital.position.set(i, 8.3, 0);
  scene.add(capital);
}

// Båge (över mitten)
const arc = new THREE.Mesh(new THREE.TorusGeometry(3, 0.2, 16, 100, Math.PI), accentMaterial);
arc.rotation.x = Math.PI / 2;
arc.rotation.z = Math.PI;
arc.position.set(0, 8, 0.1);
scene.add(arc);

// Entablement / taklist
const entablature = new THREE.Mesh(new THREE.BoxGeometry(18, 0.8, 1.2), accentMaterial);
entablature.position.set(0, 9.5, 0);
scene.add(entablature);

// Golvbas
const base = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 5), accentMaterial);
base.position.set(0, 0.5, 0);
scene.add(base);

// ===== Controls =====
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enablePan = false;

// ===== Render loop =====
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
