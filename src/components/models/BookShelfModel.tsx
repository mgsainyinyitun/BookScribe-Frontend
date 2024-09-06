import { FC, useEffect, useRef, useState } from 'react'
import { useGLTF } from '@react-three/drei'
import shelf from '/assets/3d/book_shelf.glb';
import BookShelf from '../../objects/BookShelf';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, PerspectiveCamera } from 'three';
import { POSITION } from '../../constants/BookShelfConstant';
import StorageModel from './StorageModel';
import Book from '../../objects/Book';
import { books } from '../../demo/data';

const bookshelf = new BookShelf();

interface bookshelfProps {
    currentState: string,
    toState: string,
    setCurrentState: (arg: string) => void,
    setToState: (arg: string) => void,
}

const BookShelfModel: FC<bookshelfProps> = ({ currentState, toState, setCurrentState, setToState }) => {
    const { camera } = useThree();
    const { nodes, materials } = useGLTF(shelf)
    const bookRef = useRef<Group>(null);
    bookshelf.setRef(bookRef);
    bookshelf.setCamera(camera as PerspectiveCamera);

    const mod_nodes = nodes as any;


    useFrame(() => {
        if (currentState !== toState) {
            switch (toState) {
                case POSITION.BACK_VIEW: (bookshelf.moveToOrigin() || setCurrentState(toState)); break;
                case POSITION.CENTET_SHELF: (bookshelf.moveToCenterShelf() || setCurrentState(toState)); break;
                case POSITION.UP_SHELF: (bookshelf.moveToUpperShelf() || setCurrentState(toState)); break;
                case POSITION.LOW_SHELF: bookshelf.moveToLowerShelf() || setCurrentState(toState); break;
                default: break;
            }
        }
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
                geometry={mod_nodes.Plane003_Plane005.geometry}
                material={materials.metal}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={mod_nodes.Plane003_Plane005_1.geometry}
                material={materials.wood_white}
            />
            <mesh position={[0.21, 1.24, 0]}>
                <StorageModel
                    onClickFun={() => setToState(POSITION.UP_SHELF)}
                    currentState={currentState}
                    toState={toState}
                    books={[]}
                />
            </mesh>
            <mesh position={[0.21, 0.72, 0]}>
                <StorageModel
                    onClickFun={() => setToState(POSITION.CENTET_SHELF)}
                    currentState={currentState}
                    toState={toState}
                    books={[new Book(20,books[1])]}
                />
            </mesh>
            <mesh position={[0.21, 0.2, 0]}>
                <StorageModel
                    onClickFun={() => setToState(POSITION.LOW_SHELF)}
                    currentState={currentState}
                    toState={toState}
                    books={[]}
                />
            </mesh>
        </group>
    )
}

export default BookShelfModel;
