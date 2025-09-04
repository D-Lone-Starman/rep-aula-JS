import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.1/build/three.module.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.160.1/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, loader, currentModel;

const modelsDB = {
"Cubo": "models/cube.glb",
"Esfera": "models/sphere.glb",
"Espada": "models/espada.gltf"
};

init();
populateSelector();

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
  scene.add(light);

  loader = new GLTFLoader();

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  if (currentModel) currentModel.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function populateSelector() {
  const selector = document.getElementById('modelSelector');
  for (const name in modelsDB) {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    selector.appendChild(option);
  }
}

window.loadSelectedModel = function () {
  const selectedName = document.getElementById('modelSelector').value;
  const modelPath = modelsDB[selectedName];

  if (!modelPath) return;

  if (currentModel) scene.remove(currentModel);

  loader.load(modelPath, (gltf) => {
    currentModel = gltf.scene;
    scene.add(currentModel);
  }, undefined, (error) => {
    console.error("Erro ao carregar modelo:", error);
  });
}
