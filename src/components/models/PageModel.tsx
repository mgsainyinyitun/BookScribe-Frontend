import { FC, useEffect, useMemo, useRef, useState } from "react"
import Page from "../../objects/Page"
import { Box3, MathUtils, MeshStandardMaterial, SkeletonHelper, SkinnedMesh, Vector3 } from "three";
import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Book from "../../objects/Book";
import { degToRad } from "three/src/math/MathUtils.js";
import { useCtx } from "../../Ctx";
interface pageProps {
    page: Page,
    index: number,
    opened: boolean,
    currentState: string,
    book: Book
}


const PageModel: FC<pageProps> = ({ page, index, book }) => {
    const pageRef = useRef();
    const { focusedBook, focusedFrontPage, focusedBackPage } = useCtx();
    page.setPageRef(pageRef);

    useFrame(() => {
        const ref = pageRef as any
        let targetRotation = page.calculateOpen(book) ? -Math.PI : 0; //+ (index * 0.0001)

        page.calculateOpen(book) ? targetRotation += degToRad(index * 0.5) : null;

        if (pageRef.current) {
            const bones = ref.current.skeleton.bones;
            bones[0].rotation.y = MathUtils.lerp(
                bones[0].rotation.y,
                targetRotation,
                0.08,
            );

            if (targetRotation !== 0) {
                ref.current.position.z = -1 * index * page.THICKNESS;
            } else {
                ref.current.position.z = index * page.THICKNESS;
            }
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

    useEffect(() => {
        if (focusedBook === book && focusedFrontPage) {
            if (focusedFrontPage.pageIndex === page.pageIndex) {
                skinMesh.material = page.updateFrontMaterials(skinMesh.material as MeshStandardMaterial[], focusedFrontPage.bctx)
            }
        }
    }, [focusedFrontPage]);


    useEffect(() => {
        if (focusedBook === book && focusedBackPage) {
            if (focusedBackPage.pageIndex === page.pageIndex) {
                skinMesh.material = page.updateBackMaterials(skinMesh.material as MeshStandardMaterial[], focusedBackPage.fctx)
            }
        }
    }, [focusedBackPage]);

    return (
        <primitive
            position={ //
                [page.position[0], 0, (index * page.THICKNESS)]} // (index*0.01)
            rotation={page.rotation}
            scale={page.scale}
            object={skinMesh}
            ref={pageRef}
        >
            {
                // page.pageIndex === 0 && <axesHelper />
            }

        </primitive>

    );
}

export default PageModel