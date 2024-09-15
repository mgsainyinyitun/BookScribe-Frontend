import { Bone, BoxGeometry, CanvasTexture, Float32BufferAttribute, MeshStandardMaterial, Skeleton, SkinnedMesh, TextureLoader, Uint16BufferAttribute, Vector3 } from "three";
import { PAGE_STATE } from "../constants/PageConstant";
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
    fctx: string = '';
    bctx: string = '';

    public pageState: string = PAGE_STATE.CLOSE;
    public frontCover = null;
    public backCover = null;

    // public frontCover = useLoader(TextureLoader, "/assets/images/front_cover.png");
    // public backCover = useLoader(TextureLoader, "/assets/images/back_cover.png");

    readonly WIDTH: number;
    readonly HEIGHT: number;
    readonly THICKNESS: number;
    readonly SEGMENTS: number
    readonly SEGMENT_WIDTH: number;


    shallowClone(): Page {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }

    constructor(idx: number, mIdx: number, fcv?: any, bcv?: any) {//3.2
        this.position = [-0.11, 0, 0];
        this.rotation = [0, Math.PI, 0]
        this.scale = [1, 1, 1]
        this.args = [0.2, 0.32, 0.001]
        this.WIDTH = 0.2;
        this.HEIGHT = 0.32;
        this.THICKNESS = 0.0005;
        this.SEGMENTS = 15;
        this.SEGMENT_WIDTH = this.WIDTH / this.SEGMENTS;
        this.geomentry = new BoxGeometry(
            this.WIDTH,
            this.HEIGHT,
            this.THICKNESS,
            this.SEGMENTS,
            2
        );
        this.frontCover = fcv;
        this.backCover = bcv;
        this.pageIndex = idx;
        this.maxIndex = mIdx;
        this.computeSkinIndicesAndWeights();
        this.skinMesh = this.computeSkinnedMesh();
    }

    setCtx(ftxt: string, btxt: string) {
        this.fctx = ftxt;
        this.bctx = btxt;
        this.skinMesh = this.computeSkinnedMesh();
    }

    setFrontCtx(ftxt: string) {
        this.fctx = ftxt;
    }


    setBackCtx(btxt: string) {
        this.bctx = btxt;
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


    computeMaterials(): MeshStandardMaterial[] {
        const materials = [
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({ color: '#D2b48c' }),
            new MeshStandardMaterial({
                color: this.pageIndex === 0 ? '' : '#D2b48c',
                map: this.pageIndex === 0 ? this.frontCover : null,
            }),
            new MeshStandardMaterial({
                color: this.pageIndex === this.maxIndex ? '' : '#D2b48c',
                map: this.pageIndex === this.maxIndex ? this.backCover : null
            }),
        ];
        return materials;
    }


    updateFrontCoverPage(mtrs: MeshStandardMaterial[], cover: any) {
        const material = [
            mtrs[0], mtrs[1], mtrs[2], mtrs[3],
            new MeshStandardMaterial({
                map: cover,
            }),
            mtrs[5]
        ];
        this.frontCover = cover;
        return material;
    }

    updateBackCoverPage(mtrs: MeshStandardMaterial[], cover: any) {
        const material = [
            mtrs[0], mtrs[1], mtrs[2], mtrs[3],
            mtrs[4],
            new MeshStandardMaterial({
                map: cover,
            }),
        ];
        this.backCover = cover;
        return material;
    }

    updateFrontMaterials(mtrs: MeshStandardMaterial[], text: string): MeshStandardMaterial[] {
        const material = [
            mtrs[0], mtrs[1], mtrs[2], mtrs[3], mtrs[4],
            new MeshStandardMaterial({
                color: this.pageIndex === this.maxIndex ? '' : '#D2b48c',
                map: this.pageIndex !== this.maxIndex ? this.createCanvasTexture(`${this.calculatePageNumber().back}`, text) : this.backCover
            }),
        ]
        return material;
    }

    updateBackMaterials(mtrs: MeshStandardMaterial[], text: string): MeshStandardMaterial[] {
        const material = [
            mtrs[0], mtrs[1], mtrs[2], mtrs[3],
            new MeshStandardMaterial({
                color: this.pageIndex === this.maxIndex ? '' : '#D2b48c',
                map: this.pageIndex !== this.maxIndex ? this.createCanvasTexture(`${this.calculatePageNumber().front}`, text) : null
            }),
            mtrs[5],
        ]
        return material;
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
        const materials = this.computeMaterials();
        const mesh = new SkinnedMesh(this.geomentry, materials);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.frustumCulled = false;
        mesh.add(skeleton.bones[0]);
        mesh.bind(skeleton);
        return mesh;
    }

    calculatePageNumber(): { front: any, back: any } {
        if (this.pageIndex === 0 || this.pageIndex === this.maxIndex) {
            return { front: '', back: '' }
        }
        return { front: this.pageIndex + (this.pageIndex - 1), back: this.pageIndex * 2 };
    }

    createCanvasTexture(pgNo: string, text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d') as any;
        canvas.width = 800;
        canvas.height = 1200;
        // Set the background color
        context.fillStyle = '#D2b48c'; // Background color
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.drawPageNumber(context, canvas, pgNo);
        this.drawText(context, text);


        context.strokeStyle = 'black'; // Border color
        context.lineWidth = 1;         // Border width
        context.strokeRect(0, 0, canvas.width, canvas.height);

        return new CanvasTexture(canvas);
    };


    readonly lineSpace: number = 30;
    readonly initLineY: number = 70;
    readonly initLeftX: number = 20;

    drawText(context: any, text: string) {
        context.font = '25px Arial';
        context.fillStyle = 'black';
        this.wrapText(context, text, this.initLeftX, this.initLineY, 780, 25);
    }

    wrapText(context: any, text: string, x: number, y: number, maxWidth: number, fontSize: number, fontFace?: number) {
        var words = text.split(' ');
        var line = '';
        var lineHeight = fontSize + 2;
        context.textAlign = 'left';
        context.font = fontSize + " " + fontFace;

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' '; // words[1.....n] ; line = ''=>'words[0]
            var metrics = context.measureText(testLine); // text width
            var testWidth = metrics.width; // testWidth = width of text

            if (testWidth > maxWidth) { // if wordswidth is greater than maxwidth 
                context.fillText(line, x, y); // draw the text on x,y
                line = words[n] + ' '; // line = words[n]
                y += lineHeight;    // increase line height
            } else {
                line = testLine; // line = words[0] + words[1] + ....
            }

        }
        context.fillText(line, x, y);
    }

    drawPageNumber(context: any, canvas: HTMLCanvasElement, text: string) {
        context.font = '25px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(`- ${text} -`, canvas.width / 2, 20);
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