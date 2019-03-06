///<reference path="../definitions/three.d.ts"/>

class Engine {
    private renderer: THREE.WebGLRenderer;
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    public flock: Flock;
    private element: HTMLElement;

    public constructor(element: HTMLElement, clearColour: number) {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(clearColour);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(element.clientWidth, element.clientHeight);
        element.appendChild(this.renderer.domElement);

        this.scene = new THREE.Scene();
        this.flock = new Flock(this.scene, 20, 40);
    }

    public enableShadows(): void {
        this.renderer.shadowMap.enabled = true;
    }

    public setCamera(camera: THREE.PerspectiveCamera): void {
        this.camera = camera;
        window.addEventListener('resize', () => {
            this.camera.aspect = this.element.clientWidth / this.element.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.element.clientWidth, this.element.clientHeight);
        }, false);
    }

    public getCamera(): THREE.PerspectiveCamera {
        return this.camera;
    }

    public setBackground(): void {
        this.scene.background = new THREE.Color(0xEFCBB8);
    }

    public addToFlock() {
        if (this.flock.size === this.flock.max) {
            const obsolete = this.flock.flock.shift();
            this.scene.remove(obsolete);
        }
        this.flock.addBoid(this.scene);
    }

    public update(): void {
        this.flock.updateFlock();
        this.renderer.render(this.scene, this.camera);
    }
}