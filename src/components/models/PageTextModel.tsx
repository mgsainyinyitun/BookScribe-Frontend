import { Text } from '@react-three/drei'
import { FC } from 'react'
import Page from '../../objects/Page'

interface pageProps {
    page: Page
}

const PageTextModel: FC<pageProps> = ({ page }) => {
    
    return (
        <Text
            position={[0, 0, 0.2]} // Adjust position as needed
            // rotation={[0, 0, 0]} // Adjust rotation as needed
            // scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
            fontSize={0.03} // Adjust fontSize as needed
            color="red" // Adjust text color as needed
        >
            {'Page -' + page.pageIndex}
        </Text>
    )
}

export default PageTextModel