import { Component, OnInit, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.css']
})
export class AnimationComponent implements OnInit {
  private mixer: THREE.AnimationMixer | null = null;
  private clock: THREE.Clock = new THREE.Clock();
  private renderer: THREE.WebGLRenderer | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private scene: THREE.Scene | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initThreeJS();
  }

  private initThreeJS() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, -1, 8); // Ajustez ces valeurs selon votre modèle

    // Configurer le renderer avec un fond transparent
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('three-container')?.appendChild(this.renderer.domElement);

    // Ajout d'éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Augmenter l'intensité
    this.scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1); // Augmenter l'intensité
    directionalLight1.position.set(0, 1, 0);
    this.scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5); // Lumière directionnelle supplémentaire
    directionalLight2.position.set(1, 0, 0);
    this.scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.5); // Lumière ponctuelle
    pointLight.position.set(0, 0, 10);
    this.scene.add(pointLight);

    const loader = new GLTFLoader();
    loader.load('./assets/videos/animation.glb', (gltf) => {
      if (this.scene) {
        this.scene.add(gltf.scene);
         // Incliner le modèle de 10 degrés vers l'utilisateur
         gltf.scene.rotation.x = THREE.MathUtils.degToRad(30);
         // Rotation horizontale de 90 degrés dans le sens antihoraire
         gltf.scene.rotation.y = THREE.MathUtils.degToRad(90);
         
      }
      
      if (gltf.animations && gltf.animations.length) {
        this.mixer = new THREE.AnimationMixer(gltf.scene);
        const action = this.mixer.clipAction(gltf.animations[0]);
        action.play();
      }
      
      this.animate();
    }, undefined, (error) => {
      console.error('Erreur lors du chargement du modèle:', error);
    });

    // Ajouter un voile d'ombre noire
    const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0.65, transparent: true });
    const shadowPlane = new THREE.PlaneGeometry(20, 20);
    const shadowMesh = new THREE.Mesh(shadowPlane, shadowMaterial);
    shadowMesh.position.set(0, 0, 5); // Positionner le voile devant la caméra
    this.scene.add(shadowMesh);
  }
  
  private animate() {
    requestAnimationFrame(() => this.animate());
    
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());
    }
    
    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.renderer && this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }
}