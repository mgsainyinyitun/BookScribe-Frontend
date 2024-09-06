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

    constructor(noOfPages: number = 20) {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.numberofPages = noOfPages;
        this.createPages();
    }

    setOpenPage(page: number) {
        this.openedPage = page;
    }

    setBookState(state: string) {
        this.bookState = state;
    }

    setBookRef(ref: any) {
        this.bookRef = ref;
    }

    createPages() {
        for (let i = 0; i < this.numberofPages; i++) {
            this.pages.push(new Page(i, this.numberofPages-1));
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
        const targetRotationY = Math.PI /2  // -1.5

        if (this.bookRef.current.rotation.y < targetRotationY) {
            this.bookRef.current.rotation.y += 0.02;
            isMoved = true;
        }
        // camera.position.z
        if (this.bookRef.current.position.x >= -1 * (1 - 0.68)) { //camera.position.z
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