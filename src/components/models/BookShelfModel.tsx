import { FC, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import shelf from '/assets/3d/book_shelf.glb';
import BookShelf from '../../objects/BookShelf';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, PerspectiveCamera } from 'three';

const bookshelf = new BookShelf();

const BookShelfModel: FC = () => {
    const { camera } = useThree();
    const { nodes, materials } = useGLTF(shelf)
    const bookRef = useRef<Group>(null);
    bookshelf.setRef(bookRef);
    bookshelf.setCamera(camera as PerspectiveCamera);

    useFrame(()=>{
        bookshelf.moveToCenterShelf();
    })

    return (
        <group
            position={bookshelf.position}
            rotation={bookshelf.rotation}
            scale={bookshelf.scale}
            ref={bookRef}
        >
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane003_Plane005.geometry}
                material={materials.metal}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Plane003_Plane005_1.geometry}
                material={materials.wood_white}
            />
        </group>
    )
}

export default BookShelfModel;
