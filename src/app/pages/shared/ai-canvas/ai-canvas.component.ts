import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import * as THREE from "three";

@Component({
  selector: "app-ai-canvas",
  standalone: true,
  templateUrl: "./ai-canvas.component.html",
  styleUrls: ["./ai-canvas.component.css"],
})
export class AICanvasComponent implements OnInit, OnDestroy {
  @Input() containerId!: string;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private robot!: THREE.Group;

  private angularSpeedX = 0.005;
  private angularSpeedY = 0.005;

  constructor() {}

  ngOnInit(): void {
    if (!this.containerId) {
      console.error("Please provide a target container ID for the robot.");
      return;
    }
    this.init();
    this.renderer?.setClearColor(new THREE.Color(0xffffff), 1);
  }

  ngOnDestroy(): void {
    if (typeof window !== "undefined") {
      window.removeEventListener("click", this.rotateRobotOnClick.bind(this));
      window.removeEventListener("resize", this.handleResize.bind(this));
    }
  }

  private init(): void {
    // Create a scene
    this.scene = new THREE.Scene();

    // Create a camera
    if (typeof window !== "undefined") {
      console.log("here");
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.z = 5;
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      const targetContainer = document.getElementById(this.containerId);

      // Append the renderer's dom element to the target container
      if (targetContainer) {
        targetContainer.appendChild(this.renderer.domElement);
        this.handleResize();
      }

      // Create a robot
      this.createRobot();

      // Add event listener for mouse click
      window.addEventListener("click", this.rotateRobotOnClick.bind(this));
      window.addEventListener("resize", this.handleResize.bind(this));

      // Animation loop
      this.animate();
    }
  }

  private createRobot(): void {
    // Create a robot geometry (example: a simple box)
    const bodyGeometry = new THREE.BoxGeometry(1, 1, 1);
    const headGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const limbGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);

    // Create materials

    const bodyMaterial = new THREE.MeshBasicMaterial({
      color: 0xeef8f8,
    });
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x1ac4ff });
    const limbMaterial = new THREE.MeshBasicMaterial({ color: 0x1ac4ff });

    // Create body parts
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    const head = new THREE.Mesh(headGeometry, headMaterial);
    const leftArm = new THREE.Mesh(limbGeometry, limbMaterial);
    const rightArm = new THREE.Mesh(limbGeometry, limbMaterial);
    const leftLeg = new THREE.Mesh(limbGeometry, limbMaterial);
    const rightLeg = new THREE.Mesh(limbGeometry, limbMaterial);

    // Position the body parts
    head.position.y = 1.2;
    leftArm.position.set(-0.6, 0.7, 0);
    rightArm.position.set(0.6, 0.7, 0);
    leftLeg.position.set(-0.3, -0.7, 0);
    rightLeg.position.set(0.3, -0.7, 0);

    // Create a group to hold all body parts
    this.robot = new THREE.Group();
    this.robot.add(body);
    this.robot.add(head);
    this.robot.add(leftArm);
    this.robot.add(rightArm);
    this.robot.add(leftLeg);
    this.robot.add(rightLeg);

    // Add the robot to the scene
    this.scene.add(this.robot);
  }

  private rotateRobotOnClick(): void {
    // Calculate mouse click position in normalized device coordinates
    this.angularSpeedX += 0.005;
    this.angularSpeedY += 0.005;
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
    requestAnimationFrame(() => {
      this.animate();
      this.robot.rotation.x += this.angularSpeedX;
      this.robot.rotation.y += this.angularSpeedY;
      this.renderer.render(this.scene, this.camera);
      this.handleResize();
    });
  }
}
