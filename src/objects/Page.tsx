import { Bone, BoxGeometry, Float32BufferAttribute, MeshStandardMaterial, Skeleton, SkinnedMesh, Uint16BufferAttribute, Vector3 } from "three";

class Page {
    position: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
    scale: [x: number, y: number, z: number];
    args: [x: number, y: number, z: number]
    geomentry: BoxGeometry;
    skinMesh: SkinnedMesh;


    readonly WIDTH: number;
    readonly HEIGHT: number;
    readonly THICKNESS: number;
    readonly SEGMENTS: number

    constructor() {
        this.position = [-0.11, 0, 0];
        this.rotation = [-0.1, -0.17, 0]
        this.scale = [3, 3, 3]
        this.args = [0.2, 0.32, 0.001]
        this.WIDTH = 0.2;
        this.HEIGHT = 0.32;
        this.THICKNESS = 0.001;
        this.SEGMENTS = 30;
        this.geomentry = new BoxGeometry(
            this.WIDTH,
            this.HEIGHT,
            this.THICKNESS,
            this.SEGMENTS,
            2
        );
        this.computeSkinIndicesAndWeights();
        this.skinMesh = this.computeSkinnedMesh();
    }


    computeSkinnedMesh(): SkinnedMesh {
        const bones = [];
        for (let i = 0; i <= this.SEGMENTS; i++) {
            let bone = new Bone();
            bones.push(bone);
            if (i === 0) {
                bone.position.x = -0.1;
            } else {
                bone.position.x = this.WIDTH / this.SEGMENTS;
            }
            if (i > 0) {
                bones[i - 1].add(bone);
            }
        }
        const skeleton = new Skeleton(bones);
        const materials = [
            new MeshStandardMaterial({ color: 'green' }),
            new MeshStandardMaterial({ color: 'green' }),
            new MeshStandardMaterial({ color: 'green' }),
            new MeshStandardMaterial({ color: 'green' }),
            new MeshStandardMaterial({ color: 'yellow' }),
            new MeshStandardMaterial({ color: 'red' }),
        ]
        const mesh = new SkinnedMesh(this.geomentry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }


    computeSkinIndicesAndWeights(): void {
        const position = this.geomentry.attributes.position;
        const vertex = new Vector3();

        const skinIndices = [];
        const skinWeights = [];

        for (let i = 0; i < position.count; i++) {
            vertex.fromBufferAttribute(position, i);
            // compute skinIndex and skinWeight based on some configuration data
            const x = (vertex.x + this.HEIGHT / 2);
            const skinIndex = Math.floor(x / this.HEIGHT);
            const skinWeight = (x % this.HEIGHT) / this.HEIGHT;
            skinIndices.push(skinIndex, skinIndex + 1, 0, 0);
            skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
        }

        this.geomentry.setAttribute('skinIndex', new Uint16BufferAttribute(skinIndices, 4));
        this.geomentry.setAttribute('skinWeight', new Float32BufferAttribute(skinWeights, 4));
    }
}

export default Page;