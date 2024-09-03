import { Canvas } from '@react-three/fiber'
import { FC, useEffect, useRef, useState } from 'react'
import BookShelfModel from '../models/BookShelfModel'
import { OrbitControls } from '@react-three/drei'
import Control from '../control/Control'
import { POSITION } from '../../constants/BookShelfConstant'

const Home: FC = () => {

    const [currentState, setCurrentState] = useState<string>(POSITION.BACK_VIEW);
    const [toState, setToState] = useState<string>(POSITION.BACK_VIEW);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    return (
        <div className='w-full h-screen'>
            <Canvas
                className='w-full h-screen border-red-500 border-2'
                ref={canvasRef}
                camera={{
                    far: 1000,
                    position: [0, 0, 15]
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
                {/* <OrbitControls enableZoom={false} enablePan={false}/> */}
            </Canvas>
            <Control controlBtnClick={setToState} currentState={currentState} />
        </div>
    )
}

export default Home