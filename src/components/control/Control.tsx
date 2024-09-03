import { FC } from 'react'

interface controlProps {
    controlBtnClick: (arg: string) => void,
}

const Control: FC<controlProps> = ({ controlBtnClick }) => {
    return (
        <div className='w-full h-20 fixed bottom-0 right-0 flex flex-row-reverse p-1 gap-2'>
            <button
                onClick={() => controlBtnClick("V")}
                className='w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                V
            </button>

            <button
                onClick={() => controlBtnClick("U")}
                className='w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                U
            </button>

            <button
                onClick={() => controlBtnClick("D")}
                className='w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                D
            </button>

            <button
                onClick={() => controlBtnClick("B")}
                className='w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'>
                B
            </button>
        </div>
    )
}

export default Control