import { Canvas } from '@react-three/fiber'
import { FC, useRef } from 'react'
import BookShelfModel from '../models/BookShelfModel'
// import { OrbitControls } from '@react-three/drei'
import Control from '../control/Control'

const Home: FC = () => {

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
                <BookShelfModel />
                {/* <OrbitControls/> */}
            </Canvas>
            <Control controlBtnClick={() => { }} />
        </div>
    )
}

export default Home