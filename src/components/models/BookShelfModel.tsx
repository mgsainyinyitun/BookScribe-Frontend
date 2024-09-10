import { FC, useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import shelf from '/assets/3d/book_shelf.glb';
import BookShelf from '../../objects/BookShelf';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, PerspectiveCamera } from 'three';
import { POSITION } from '../../constants/BookShelfConstant';
import StorageModel from './StorageModel';
import { useCtx } from '../../Ctx';
import Book from '../../objects/Book';

const bookshelf = new BookShelf();

interface bookshelfProps {
    currentState: string,
    toState: string,
    setCurrentState: (arg: string) => void,
    setToState: (arg: string) => void,
    cameraRef: any,
}

const BookShelfModel: FC<bookshelfProps> = ({ currentState, toState, setCurrentState, setToState, cameraRef }) => {
    const { camera } = useThree();
    const { nodes, materials } = useGLTF(shelf)
    const bookRef = useRef<Group>(null);
    const { booStorage, updateBookStorage, bookContents } = useCtx();

    bookshelf.setRef(bookRef);
    bookshelf.setCamera(camera as PerspectiveCamera);

    const mod_nodes = nodes as any;

    const setCameraToOrigin = (): boolean => {

        // console.log(cameraRef.current.position);

        // cameraRef.current.position.set(0, 0, 1);

        // cameraRef.current.position.setX(0);
        // cameraRef.current.position.setY(0);
        // cameraRef.current.position.setZ(1);
        let isCamMoved = false;

        if (Math.abs(cameraRef.current.position.x) > 0.001) {
            let x = cameraRef.current.position.x;
            Math.abs(cameraRef.current.position.x) < 0.1 ? cameraRef.current.position.setX(0) :
                cameraRef.current.position.setX(Math.sign(x) * (Math.abs(x) - 0.1));
            isCamMoved = true;
        }

        if (Math.abs(cameraRef.current.position.y) > 0.001) {
            let y = cameraRef.current.position.y;
            Math.abs(cameraRef.current.position.y) < 0.1 ? cameraRef.current.position.setY(0) :
                cameraRef.current.position.setY(Math.sign(y) * (Math.abs(y) - 0.1));
            isCamMoved = true;
        }


        if (!(Math.abs(cameraRef.current.position.z) < 1.001 && Math.abs(cameraRef.current.position.z) > 0.999)) {
            let z = cameraRef.current.position.z;
            if (z < 1) {
                // Move y towards 1, but don't overshoot
                cameraRef.current.position.setZ(Math.min(z + 0.1, 1));
            } else {
                // Move y towards 1, but don't undershoot
                cameraRef.current.position.setZ(Math.max(z - 0.1, 1));
            }
            isCamMoved = true;
        }
        return isCamMoved;
    }

    useEffect(() => {
        const a = bookContents.map(ctx => new Book(10, ctx.text))
        updateBookStorage(a);
    }, [bookContents])


    useFrame(() => {
        if (currentState !== toState) {
            if (setCameraToOrigin()) return;
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
                    books={booStorage.filter(book => book.shelfId === 1)}
                />
            </mesh>
            <mesh position={[0.21, 0.72, 0]}>
                <StorageModel
                    onClickFun={() => setToState(POSITION.CENTET_SHELF)}
                    currentState={currentState}
                    toState={toState}
                    books={booStorage.filter(book => book.shelfId === 2)}
                // books={bookContents.map(ctx => new Book(10, ctx.text))}
                />
            </mesh>
            <mesh position={[0.21, 0.2, 0]}>
                <StorageModel
                    onClickFun={() => setToState(POSITION.LOW_SHELF)}
                    currentState={currentState}
                    toState={toState}
                    books={booStorage.filter(book => book.shelfId === 3)}
                />
            </mesh>
        </group>
    )
}

export default BookShelfModel;
