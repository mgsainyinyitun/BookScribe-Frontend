import { FC, useMemo, useRef } from "react"
import Page from "../../objects/Page"
import { MathUtils, SkeletonHelper } from "three";
import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface pageProps {
    index: number,
    pages: number[],
    opened: boolean
}


const PageModel: FC<pageProps> = ({ index, pages, opened }) => {
    console.log(index, pages);
    const page = new Page();
    const pageRef = useRef();

    // useFrame(() => {

    //     const ref = pageRef as any
    //     let targetRotation = opened ? - Math.PI / 2 : Math.PI / 2;

    //     if (pageRef.current) {
    //         const bones = ref.current.skeleton.bones;
    //         bones[0].rotation.y = MathUtils.lerp(
    //             bones[0].rotation.y,
    //             targetRotation,
    //             0.08,
    //         );  
    //     }

    // })

    const skinMesh = useMemo(() => {
        return page.skinMesh;
        // page.computeSkinnedMesh();
    }, [])

    useHelper(pageRef as any, SkeletonHelper);
    

    return (
        <group>
            <primitive
                position={[0, 0, index * page.THICKNESS]}
                object={skinMesh}
                ref={pageRef}
            />
        </group>);
}

export default PageModel