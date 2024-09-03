import { FC } from 'react'
import { POSITION } from '../../constants/BookShelfConstant'

interface controlProps {
    controlBtnClick: (arg: string) => void,
    currentState: string,
}

const Control: FC<controlProps> = ({ controlBtnClick, currentState }) => {
    return (
        <div className='w-full h-20 fixed bottom-0 right-0 flex flex-row-reverse p-1 gap-2'>
            <button
                onClick={() => controlBtnClick(POSITION.CENTET_SHELF)}
                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.CENTET_SHELF ? 'bg-violet-500' : ''}`}>
                {POSITION.CENTET_SHELF}
            </button>

            <button
                onClick={() => controlBtnClick(POSITION.UP_SHELF)}
                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.UP_SHELF ? 'bg-violet-500' : ''}`}>
                {POSITION.UP_SHELF}
            </button>

            <button
                onClick={() => controlBtnClick(POSITION.LOW_SHELF)}
                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.LOW_SHELF ? 'bg-violet-500' : ''}`}>
                {POSITION.LOW_SHELF}
            </button>

            <button
                onClick={() => controlBtnClick(POSITION.BACK_VIEW)}
                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.BACK_VIEW ? 'bg-violet-500' : ''}`}>
                {POSITION.BACK_VIEW}
            </button>
        </div>
    )
}

export default Control