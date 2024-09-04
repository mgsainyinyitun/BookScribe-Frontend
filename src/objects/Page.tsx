import { Bone, BoxGeometry, Float32BufferAttribute, MeshStandardMaterial, Skeleton, SkinnedMesh, TextureLoader, Uint16BufferAttribute, Vector3 } from "three";
import { PAGE_STATE } from "../constants/PageConstant";
import { useLoader } from "@react-three/fiber";
import Book from "./Book";
import { BOOK_STATE } from "../constants/BookConstant";

class Page {
    position: [x: number, y: number, z: number];
    rotation: [x: number, y: number, z: number];
    scale: [x: number, y: number, z: number];
    args: [x: number, y: number, z: number]
    geomentry: BoxGeometry;
    skinMesh: SkinnedMesh;
    pageIndex: number;
    maxIndex: number;
    pageRef: any;

    public pageState: string = PAGE_STATE.CLOSE;
    public paperTexture = useLoader(TextureLoader, '/assets/images/paper_003.jpg');

    readonly WIDTH: number;
    readonly HEIGHT: number;
    readonly THICKNESS: number;
    readonly SEGMENTS: number

    constructor(idx: number, mIdx: number) {//3.2
        this.position = [-0.11, 0, 0];
        this.rotation = [0, Math.PI, 0]
        this.scale = [1, 1, 1]
        this.args = [0.2, 0.32, 0.001]
        this.WIDTH = 0.2;
        this.HEIGHT = 0.32;
        this.THICKNESS = 0.0005;
        // this.THICKNESS = 0.01;
        this.SEGMENTS = 15;
        this.geomentry = new BoxGeometry(
            this.WIDTH,
            this.HEIGHT,
            this.THICKNESS,
            this.SEGMENTS,
            2
        );
        // this.geomentry.translate(0, 0, this.WIDTH/2);
        this.pageIndex = idx;
        this.maxIndex = mIdx;
        this.computeSkinIndicesAndWeights();
        this.skinMesh = this.computeSkinnedMesh();
    }

    setPageRef(ref: any) {
        this.pageRef = ref;
    }

    calculateOpen(book: Book) {
        if (book.bookState === BOOK_STATE.FRONT && this.pageIndex <= book.openedPage) {
            return true;
        }
        return false
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
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({
                color: this.pageIndex === 0 ? 'black' : '#D2b48c',
                map: this.paperTexture
            }),
            new MeshStandardMaterial({
                color: this.pageIndex === this.maxIndex ? 'cyan' : '#D2b48c',
                map: this.pageIndex !== this.maxIndex ? this.paperTexture : null
            }),


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