import { FC, useEffect, useMemo, useRef, useState } from "react"
import Page from "../../objects/Page"
import { Box3, MathUtils, SkeletonHelper, Vector3 } from "three";
import {  useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Book from "../../objects/Book";
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
        let targetRotation = page.calculateOpen(book) ? -Math.PI + (index * 0.008) : 0;

        // page.calculateOpen(book) ? targetRotation += degToRad(index * 1) : null;

        if (pageRef.current) {
            const bones = ref.current.skeleton.bones;
            bones[0].rotation.y = MathUtils.lerp(
                bones[0].rotation.y,
                targetRotation,
                0.08,
            );
        }
    })

    const skinMesh = useMemo(() => {
        return page.skinMesh;
    }, [])

    // useHelper(pageRef as any, SkeletonHelper);

    useEffect(() => {
        if (!pageRef.current) return;
        const box = new Box3().setFromObject(pageRef.current);
        const size = new Vector3();
        box.getSize(size);

    }, [pageRef])

    return (
        <primitive
            position={ //
                [page.position[0], 0, (index * page.THICKNESS)]} // (index*0.01)
            rotation={page.rotation}
            scale={page.scale}
            object={skinMesh}
            ref={pageRef}
        />

    );
}

export default PageModel