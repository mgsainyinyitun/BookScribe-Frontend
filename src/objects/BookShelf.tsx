import { Frustum, Matrix4, PerspectiveCamera, Vector3 } from "three";

// 13.7
const original = { x: 0, y: -0.7, z: 0 };

class BookShelf {
    public position: [x: number, y: number, z: number];
    public rotation: [x: number, y: number, z: number];
    public scale: [x: number, y: number, z: number];
    public bookRef: any
    public camera: PerspectiveCamera;

    constructor() {
        this.position = [original.x, original.y, original.z];
        this.rotation = [0, Math.PI / 2, 0];
        this.scale = [1, 1, 1];
        this.camera = new PerspectiveCamera();
    }

    moveToOrigin(): boolean {
        // y = -0.7 (-0.2, -1.25)

        let isMove = false;
        if (this.bookRef.current.position.z > original.z) {
            this.bookRef.current.position.z -= 0.015;
            isMove = true;
        }
        if (Math.abs(parseFloat(this.bookRef.current.position.y.toFixed(1))) !== Math.abs(original.y)) {
            if(this.bookRef.current.position.y < original.y) {
                this.bookRef.current.position.y += 0.015;
            } else {
                this.bookRef.current.position.y -= 0.015;
            }
            isMove = true;
        }
        return isMove;
    }

    moveToUpperShelf(): boolean {
        // center => [0,-1.25,14.6]
        let isMove = false
        if (this.bookRef.current.position.z < 0.65) {
            this.bookRef.current.position.z += 0.015;
            isMove = true
        }
        if (this.bookRef.current.position.y > -1.25) {
            this.bookRef.current.position.y -= 0.015;
            isMove = true
        }
        return isMove;
    }

    moveToCenterShelf(): boolean {
        // center => [0,-0.7,14.6]
        let isMove = false;
        if (this.bookRef.current.position.z < 0.65) {
            this.bookRef.current.position.z += 0.015;
            isMove = true
        }
        if (this.bookRef.current.position.y < -0.7) {
            this.bookRef.current.position.y += 0.015;
            isMove = true
        }
        if (this.bookRef.current.position.y > -0.7) {
            this.bookRef.current.position.y -= 0.015;
            isMove = true
        }
        return isMove;
    }


    moveToLowerShelf(): boolean {
        // lower => [0,-0.2,14.6]
        let isMove = false
        if (this.bookRef.current.position.z < 0.65) {
            this.bookRef.current.position.z += 0.015;
            isMove = true;
        }
        if (this.bookRef.current.position.y < -0.2) {
            this.bookRef.current.position.y += 0.015;
            isMove = true;
        }
        return isMove;
    }

    setRef(ref: any): void {
        this.bookRef = ref;
    }

    moveX(distance: number): void {
        if (this.checkOutOfView()) {
            this.bookRef.current.position.x += distance;
        }
    }

    moveY(distance: number): void {
        if (this.checkOutOfView()) {
            this.bookRef.current.position.y += distance;
        }
    }

    moveZ(distance: number): void {
        if (this.checkOutOfView()) {
            this.bookRef.current.position.z += distance;
        }
    }

    setCamera(camera: PerspectiveCamera): void {
        this.camera = camera;
    }

    checkOutOfView(): boolean {
        const frustum = new Frustum();
        const cameraProjectionMatrix = new Matrix4();
        this.camera.updateMatrixWorld();
        cameraProjectionMatrix.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(cameraProjectionMatrix);

        const meshWorldPosition = new Vector3();
        this.bookRef.current.getWorldPosition(meshWorldPosition);

        const isInFrustum = frustum.containsPoint(meshWorldPosition.addScalar(0.3));
        return isInFrustum;
    }
}

export default BookShelf;