import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import * as THREE from 'three';

type serviceText =
  | 'Software solution'
  | 'Mobile'
  | 'Web'
  | 'Cloud'
  | 'Consultancy'
  | 'Custom';

@Component({
  selector: 'app-software-software-settings-icons',
  standalone: true,
  template: '',
  styleUrls: ['./software-service.component.css'],
})
export class SoftwareServiceSettingsIconsComponent
  implements OnInit, OnDestroy
{
  @Input() containerId!: string;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private iconGroup!: THREE.Group;
  private angularSpeedZ = 0.005;

  private serviceText: serviceText = 'Software solution';

  constructor() {}

  ngOnInit(): void {
    if (!this.containerId) {
      console.error('Please provide a target container ID for the robot.');
      return;
    }
    this.initThree();
    this.renderer?.setClearColor(new THREE.Color(0xffffff), 1);
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('click', this.rotateIconOnClick.bind(this));
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
  }

  private initThree(): void {
    // Set up the scene
    this.scene = new THREE.Scene();
    if (typeof window !== 'undefined') {
      this.camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
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
      this.camera.position.z = 15;

      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      this.scene.add(ambientLight);

      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
      this.scene.add(directionalLight);
      this.createSettingsIcons();
      window.addEventListener('click', this.rotateIconOnClick.bind(this));

      // Handle window resizing
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    this.animate();
  }

  private async createSettingsIcons(): Promise<void> {
    // Create central settings icon

    const centralIcon = await this.createSettingsIcon(0x000);
    this.scene.add(centralIcon);

    // Create surrounding settings icons
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5;
      const distance = 5;

      const x = Math.cos(angle) * (distance + 6);
      const y = Math.sin(angle) * (distance + 3);

      if (i === 1) {
        this.serviceText = 'Custom';
      } else if (i === 2) {
        this.serviceText = 'Web';
      } else if (i === 3) {
        this.serviceText = 'Mobile';
      } else if (i === 4) {
        this.serviceText = 'Cloud';
      } else {
        this.serviceText = 'Consultancy';
      }
      const surroundingIcon = await this.createSettingsIcon(0x000);
      surroundingIcon.position.set(x, y, 0);
      this.scene.add(surroundingIcon);
    }
    return Promise.resolve();
  }

  private async createSettingsIcon(color: number): Promise<THREE.Group> {
    this.iconGroup = new THREE.Group();
    const gearRadius = 3.0;
    const gearTeeth = 8;
    const toothSpacing = 0.02;
    const gearThickness = 0.02;

    const gearShape = new THREE.Shape();

    const angleStep = (2 * Math.PI) / gearTeeth;

    for (let i = 0; i < gearTeeth; i++) {
      const outerAngle = i * angleStep;
      const innerAngle = outerAngle + angleStep / 2;

      const outerX = gearRadius * Math.cos(outerAngle);
      const outerY = gearRadius * Math.sin(outerAngle);
      const innerX =
        (gearRadius - (gearThickness + toothSpacing)) * Math.cos(innerAngle);
      const innerY =
        (gearRadius - (gearThickness + toothSpacing)) * Math.sin(innerAngle);

      if (i === 0) {
        gearShape.moveTo(outerX, outerY);
      } else {
        gearShape.lineTo(outerX, outerY);
      }

      gearShape.quadraticCurveTo(0, 0, innerX, innerY);
    }

    // Extrude the gear shape into a three-dimensional shape
    const extrudeSettings = { depth: 0.1, bevelEnabled: false };
    const gearGeometry = new THREE.ExtrudeGeometry(gearShape, extrudeSettings);

    // Create a material with black color and transparent background
    const gearMaterial = new THREE.MeshBasicMaterial({
      color: 0xf0f6fb,
      transparent: true,
      opacity: 3,
      side: THREE.DoubleSide,
    });

    const gearMesh = new THREE.Mesh(gearGeometry, gearMaterial);

    const centerPosition = new THREE.Vector3(0, 0, 0);

    if (this.serviceText === 'Web') {
      centerPosition.y = -3.4;
      centerPosition.x = 4.5;
      gearMesh.name = 'WebGroup';
    }

    if (this.serviceText === 'Mobile') {
      centerPosition.y = -1.7;
      centerPosition.x = 4.5;
      gearMesh.name = 'MobileGroup';
    }

    if (
      this.serviceText.trim().toLowerCase() ===
      'Software solution'.trim().toLowerCase()
    ) {
      centerPosition.y = -2.5;
      centerPosition.x = 2.0;
      gearMesh.name = 'SoftwareSolutionGroup';
    }

    if (this.serviceText === 'Cloud') {
      centerPosition.y = -1.0;
      centerPosition.x = 2.0;
      gearMesh.name = 'CloudGroup';
    }

    if (this.serviceText === 'Consultancy') {
      centerPosition.y = -2.4;
      centerPosition.x = -0.1;
      gearMesh.name = 'ConsultancyGroup';
    }

    if (this.serviceText === 'Custom') {
      centerPosition.y = -4.2;
      centerPosition.x = 1.8;
      gearMesh.name = 'CustomGroup';
    }

    centerPosition.z = 3.1;

    this.iconGroup.add(gearMesh);

    const sprite = this.createTextSprite(color);
    sprite.position.copy(centerPosition);
    this.iconGroup.add(sprite);

    return this.iconGroup;
  }

  private createTextSprite(color: number): THREE.Sprite {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    context.font = '16px Arial';
    context.fillStyle = `#${color.toString(16)}`;
    context.fillText(this.serviceText, 15, 15);

    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(-7, 6, 19);

    return sprite;
  }

  private rotateIconOnClick(): void {
    this.angularSpeedZ += 0.005;
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
    if (
      typeof window !== 'undefined' &&
      typeof requestAnimationFrame !== 'undefined'
    ) {
      requestAnimationFrame(() => {
        this.animate();
        this.scene.children.forEach((child) => {
          if (child instanceof THREE.Group) {
            child.children.forEach((iconChild) => {
              if (iconChild instanceof THREE.Mesh) {
                const rotationDirection = iconChild.name.startsWith(
                  'SoftwareSolution',
                )
                  ? -1
                  : 1;
                iconChild.rotation.z += rotationDirection * this.angularSpeedZ;
              }
            });
          }
        });
        this.renderer.render(this.scene, this.camera);
        this.handleResize();
      });
    }
  }
}
