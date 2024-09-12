import { Canvas } from '@react-three/fiber'
import { FC, useRef, useState } from 'react'
import BookShelfModel from '../models/BookShelfModel'
import { OrbitControls, OrthographicCamera, PerspectiveCamera, Sky } from '@react-three/drei'
import Controls from '../control/Controls'
import { POSITION } from '../../constants/BookShelfConstant'
import TextEditor from '../editor/TextEditor'
import { Camera } from 'three'
import NewBook from '../book/NewBook'
import UserMgmt from '../user/UserMgmt'
const Home: FC = () => {

    const [currentState, setCurrentState] = useState<string>(POSITION.BACK_VIEW);
    const [toState, setToState] = useState<string>(POSITION.BACK_VIEW);
    const [visible, setVisible] = useState(false);
    const [newBookVisible, setNewBookVisible] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraRef = useRef();

    return (
        <div className='w-full h-screen'>
            <Canvas
                className='w-full h-screen'
                ref={canvasRef}
            // camera={{
            //     far: 1000,
            //     // position: [0, 0, 15]
            //     position: [0, 0, 1],

            // }}
            >
                <PerspectiveCamera ref={cameraRef as any} position={[0, 0, 1]} makeDefault far={1000} zoom={0.55} />

                <Sky
                    distance={450000}
                    sunPosition={[1, 1, 1]}
                    inclination={0.49}
                    azimuth={0.25}
                />
                <directionalLight intensity={1.5} position={[0, 0, 15]} />
                <ambientLight intensity={0.5} />
                <BookShelfModel
                    currentState={currentState}
                    toState={toState}
                    setCurrentState={setCurrentState}
                    setToState={setToState}
                    cameraRef={cameraRef}
                />
                <OrbitControls />
            </Canvas>
            <Controls controlBtnClick={setToState} currentState={currentState} />
            <TextEditor visible={visible} setVisible={setVisible} setNewBookVisible={setNewBookVisible}/>
            <NewBook visible={newBookVisible} setVisible={setNewBookVisible} />
            <UserMgmt/>
        </div>
    )
}

export default Home