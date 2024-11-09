import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-cloud-canvas-icon",
  standalone: true,
  template: "",
  styleUrls: ["./cloud-canvas.component.css"],
})
export class CloudCanvasIconComponent implements OnInit, OnDestroy {
  @Input() containerId!: string;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private texture!: THREE.Texture;
  private rotationSpeed = 0.0008;
  private rotationDirection = 1;
  private currentRotation = 0;

  constructor() {}

  ngOnInit(): void {
    if (!this.containerId) {
      console.error("Please provide a target container ID for the robot.");
      return;
    }
    this.initScene();
    this.renderer?.setClearColor(new THREE.Color(0xffffff), 1);
  }

  ngOnDestroy(): void {
    // Remove resize event listener
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize.bind(this));
    }
  }

  private initScene(): void {
    if (typeof window !== "undefined") {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      const targetContainer = document.getElementById(this.containerId);

      // Append the renderer's dom element to the target container
      if (targetContainer) {
        targetContainer.appendChild(this.renderer.domElement);
        this.handleResize();
      }

      // Set camera position
      this.camera.position.z = 40;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      this.scene.add(directionalLight);

      this.loadTexture();
      this.createMesh();
      this.animate();
    }
  }

  private loadTexture(): void {
    const textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load("assets/images/findev/cloud.png");
  }

  private createMesh(): void {
    const material = new THREE.MeshBasicMaterial({ map: this.texture });
    const geometry = new THREE.PlaneGeometry(60, 60);
    const mesh = new THREE.Mesh(geometry, material);
    this.scene.add(mesh);
  }

  private handleResize(): void {
    const container = document.getElementById(this.containerId);
    if (container) {
      this.camera.aspect = container.clientWidth / container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(container.clientWidth, container.clientHeight);
    }
  }

  private animate(): void {
    if (this.renderer) {
      requestAnimationFrame(() => {
        this.animate();
        // Update the rotation based on the direction
        this.texture.rotation += this.rotationSpeed * this.rotationDirection;
        this.currentRotation += this.rotationSpeed * this.rotationDirection;

        // Check if the rotation limit is reached (180 degrees)
        if (Math.abs(this.currentRotation) >= Math.PI / 2) {
          this.rotationDirection *= -1;
          this.currentRotation = 0;
        }
        this.renderer.render(this.scene, this.camera);
        this.handleResize();
      });
    }
  }
}
