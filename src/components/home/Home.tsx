import { Canvas } from '@react-three/fiber'
import { FC, useRef, useState } from 'react'
import BookShelfModel from '../models/BookShelfModel'
import { OrbitControls } from '@react-three/drei'
import Control from '../control/Control'
import { POSITION } from '../../constants/BookShelfConstant'
import BookModel from '../models/BookModel'
import Book from '../../objects/Book'

const Home: FC = () => {

    const [currentState, setCurrentState] = useState<string>(POSITION.BACK_VIEW);
    const [toState, setToState] = useState<string>(POSITION.BACK_VIEW);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    return (
        <div className='w-full h-screen'>
            <Canvas
                className='w-full h-screen'
                ref={canvasRef}
                camera={{
                    far: 1000,
                    // position: [0, 0, 15]
                    position: [0, 0, 1]
                }}
            >
                <directionalLight intensity={1.5} position={[0, 0, 15]} />
                <ambientLight intensity={0.5} />
                <BookShelfModel
                    currentState={currentState}
                    toState={toState}
                    setCurrentState={setCurrentState}
                    setToState={setToState}
                />
                {/* <BookModel book={new Book()}/> */}
                <OrbitControls/>
            </Canvas>
            <Control controlBtnClick={setToState} currentState={currentState} />
        </div>
    )
}

export default Home