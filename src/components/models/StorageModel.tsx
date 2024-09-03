import { Box } from '@react-three/drei'
import { FC, useEffect, useRef, useState } from 'react'
import { POSITION } from '../../constants/BookShelfConstant';

interface storageProps {
    onClickFun: () => void,
    currentState: string,
    toState: string
}

const StorageModel: FC<storageProps> = ({ onClickFun, currentState, toState }) => {
    const boxRef = useRef<any>(null);
    const [hover, setHover] = useState(false);

    useEffect(() => {
        if (boxRef.current) {
            boxRef.current.material.color.set('blue');
        }
    }, [currentState])

    return (
        <Box
            ref={boxRef}
            args={[0.4, 0.4, 1]}
            scale={[0.95, 0.95, 0.95]}
            onPointerOver={() => setHover(currentState === POSITION.BACK_VIEW)}
            onPointerOut={() => setHover(false)}
            onClick={onClickFun}
        >
            <meshStandardMaterial
                color={hover ? 'green' : 'blue'}
                transparent={true}
                opacity={0.25}
            />
        </Box>
    )
}

export default StorageModel;