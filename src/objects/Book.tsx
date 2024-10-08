import { Camera } from "@react-three/fiber";
import Page from "./Page";
import { BOOK_STATE } from "../constants/BookConstant";

class Book {
    public position: [x: number, y: number, z: number];
    public rotation: [x: number, y: number, z: number];
    public scale: [x: number, y: number, z: number];
    public bookRef: any;
    public pages: Page[] = []
    public numberofPages: number = 0;
    public openedPage: number = 0;
    public bookState: string = BOOK_STATE.IN_SHELF;
    public ctx = [];
    public shelfId: number;
    public bookId: number = -1;
    public bookType: string = '';
    public owner: string = '';

    // const frontCover = useLoader(TextureLoader, "/assets/images/front_cover.png");
    // const backCover = useLoader(TextureLoader, "/assets/images/back_cover.png");


    constructor(noOfPages: number, text?: any, shelf?: number) {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.ctx = text || [];
        this.numberofPages = noOfPages + 2; // number of page + front cover and back cover
        this.createPages();
        this.shelfId = shelf || 1;
    }

    setBookId(id: number) {
        this.bookId = id;
    }
    setOwner(o: string) {
        this.owner = o;
    }

    setBookType(ty: string) {
        this.bookType = ty;
    }

    setNoOfPages(noOfPages: number) {
        this.numberofPages = noOfPages + 2;
    }

    setOpenPage(page: number) {
        this.openedPage = page;
    }

    setBookState(state: string) {
        this.bookState = state;
    }

    setShelfId(shelfId: number) {
        this.shelfId = shelfId;
    }

    setBookRef(ref: any) {
        this.bookRef = ref;
    }

    createPages() {
        for (let i = 0; i < this.numberofPages; i++) {  // 0 - 19
            let tmp = new Page(i, this.numberofPages - 1);

            // if (i !== 0 && i !== this.numberofPages - 1) { // if not cover pages
            //     if ((i - 1) * 2 < this.ctx.length || i + (i - 1) < this.ctx.length) {
            //         i + (i - 1) >= this.ctx.length ? tmp.setCtx(this.ctx[(i - 1) * 2], '') :
            //             tmp.setCtx(this.ctx[(i - 1) * 2], this.ctx[i + (i - 1)]);  // 1-> 0; 2-> 2 ; 3-> 4
            //     }
            // }

            // 1 => 1,2   
            // 2 => 3,4
            // 3 => 5,6
            // 4 => 7,8
            // 5 => 9,10
            // 6 => 11,12
            // 7 => 13,14

            if (i !== 0 && i !== this.numberofPages - 1) { // if not cover pages
                const fp: any = this.ctx.find((it: any) => it.no === i + (i - 1));
                const bp: any = this.ctx.find((it: any) => it.no === i * 2)
                tmp.setCtx(fp ? fp.contexts : '', bp ? bp.contexts : '');
            }
            this.pages.push(tmp);
        }
    }

    moveToOldPosition(oldPosition: any): boolean {
        let isMoved = false;

        if (this.bookRef.current.rotation.y > oldPosition.rotation.y) { // -1.5 < 0 
            this.bookRef.current.rotation.y -= 0.02;
            isMoved = true;
        }

        if (this.bookRef.current.position.x <= oldPosition.position.x) { //camera.position.z
            this.bookRef.current.position.x += 0.01;
            isMoved = true;
        }

        if (this.bookRef.current.position.z > oldPosition.position.z) {
            this.bookRef.current.position.z -= 0.01;
            isMoved = true;
        }
        if (this.bookRef.current.position.y < oldPosition.position.y) {
            this.bookRef.current.position.y += 0.01;
            isMoved = true;
        }
        return isMoved;
    }

    moveToFrontLocation(camera: Camera): boolean {
        let isMoved = false;
        const targetRotationY = Math.PI / 2  // -1.5

        if (this.bookRef.current.rotation.y < targetRotationY) {
            this.bookRef.current.rotation.y += 0.02;
            isMoved = true;
        }
        // camera.position.z
        if (this.bookRef.current.position.x >= -1 * (camera.position.z - 0.68)) { //camera.position.z
            this.bookRef.current.position.x -= 0.01;
            isMoved = true;
        }

        if (this.bookRef.current.position.z < 0) {
            this.bookRef.current.position.z += 0.01;
            isMoved = true;
        }
        // 0 => 0.02

        if (this.bookRef.current.position.y > -0.02) {
            this.bookRef.current.position.y -= 0.01;
            isMoved = true;
        }

        // this.bookRef.current.position.z = 0

        return isMoved;
    }
}

export default Book;