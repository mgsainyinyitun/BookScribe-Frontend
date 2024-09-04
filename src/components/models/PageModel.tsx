import { FC, useEffect, useMemo, useRef } from "react"
import Page from "../../objects/Page"
import { CanvasTexture, MathUtils, SkeletonHelper } from "three";
import { Text, useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { BOOK_STATE } from "../../constants/BookConstant";
import Book from "../../objects/Book";
import image from "/assets/images/paper_003.jpg";

interface pageProps {
    page: Page,
    index: number,
    opened: boolean,
    currentState: string,
    book: Book
}


const PageModel: FC<pageProps> = ({ page, index, opened, currentState, book }) => {
    const pageRef = useRef();
    page.setPageRef(pageRef);

    useFrame(() => {
        const ref = pageRef as any
        // if (book.bookState === BOOK_STATE.FRONT && book.openedPage === index) {

        // let targetRotation = (book.bookState === BOOK_STATE.FRONT && book.openedPage === index) ? -Math.PI : 0;

        let targetRotation = page.calculateOpen(book) ? -Math.PI : 0;

        if (pageRef.current) {
            const bones = ref.current.skeleton.bones;
            bones[0].rotation.y = MathUtils.lerp(
                bones[0].rotation.y,
                targetRotation,
                0.05,
            );
        }
        // }
    })

    const skinMesh = useMemo(() => {
        return page.skinMesh;
    }, [])

    // useHelper(pageRef as any, SkeletonHelper);


    useEffect(() => {
        // Create a canvas and get its context

        // if (index === 1) {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d') as any;

            // Set canvas size
            canvas.width = 800;
            canvas.height = 1200;

            const img = new Image();
            img.src = "/assets/images/paper_002.jpg";

            img.onload = () => {
                context.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Draw text on canvas
                context.font = '25px Arial';
                context.fillStyle = 'red';
                context.textAlign = 'center';
                context.textBaseline = 'middle';

                console.log(`Page - ${page.pageIndex}`)

                context.fillText(`Page - ${index}`, canvas.width / 2, canvas.height / 18);

                // Create a texture from the canvas
                const texture = new CanvasTexture(canvas);
                texture.needsUpdate = true;

                // Apply the texture to the material
                if (pageRef.current) {
                    const ref = pageRef as any;
                    ref.current.material[5].map = texture;
                    ref.current.material[4].map = texture;
                    ref.current.material[3].map = texture;
                }
            }
        // }

    }, []);

    return (

        <group>
            <primitive
                position={ //
                    [page.position[0], 0, (index * page.THICKNESS)]} // (index*0.01)
                rotation={page.rotation}
                scale={page.scale}
                object={skinMesh}
                ref={pageRef}
            />
            {/* <Text
                position={[0.01, 0.02, -0.0009]} // Adjust as needed
                fontSize={0.01}
                color="black"
                anchorX="center"
                anchorY="middle"
            >
                Your Text Here
            </Text> */}
        </group>
    );
}

export default PageModel