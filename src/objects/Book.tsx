import Page from "./Page";

class Book {
    public position: [x: number, y: number, z: number];
    public rotation: [x: number, y: number, z: number];
    public scale: [x: number, y: number, z: number];
    public bookRef: any;
    public pages: Page[] = []


    constructor() {
        this.position = [0, 0, 0];
        this.rotation = [0, 0, 0];
        this.scale = [1, 1, 1];
    }
}

export default Book;