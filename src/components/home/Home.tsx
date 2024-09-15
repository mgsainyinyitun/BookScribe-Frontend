import { Canvas } from '@react-three/fiber'
import { FC, useRef, useState } from 'react'
import BookShelfModel from '../models/BookShelfModel'
import { OrbitControls, PerspectiveCamera, Sky } from '@react-three/drei'
import Controls from '../control/Controls'
import { POSITION } from '../../constants/BookShelfConstant'
import TextEditorWraper from '../editor/TextEditorWraper'
import NewBook from '../book/NewBook'
import UserMgmt from '../user/UserMgmt'
import Loading from '../loading/Loading'
import { useCtx } from '../../Ctx'
const Home: FC = () => {

    const [currentState, setCurrentState] = useState<string>(POSITION.BACK_VIEW);
    const [toState, setToState] = useState<string>(POSITION.BACK_VIEW);
    const [newBookVisible, setNewBookVisible] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const cameraRef = useRef();

    const { loading } = useCtx();

    return (
        <div className='w-full h-screen'>
            <Canvas
                className='w-full h-screen'
                ref={canvasRef}
            >
                <PerspectiveCamera ref={cameraRef as any} position={[0, 0, 1]} makeDefault far={1000} zoom={0.55} />

                <Sky
                    distance={450000}
                    sunPosition={[1, 1, 1]}
                    inclination={0.49}
                    azimuth={0.25}
                />
                <directionalLight intensity={1.5} position={[0, 0, 15]} />
                <ambientLight intensity={0.4} />
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
            <TextEditorWraper setNewBookVisible={setNewBookVisible} />
            <NewBook visible={newBookVisible} setVisible={setNewBookVisible} />
            <UserMgmt />
            <Loading visible={loading} />
        </div>
    )
}

export default Home