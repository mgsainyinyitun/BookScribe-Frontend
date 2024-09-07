import { faBars, faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useRef } from 'react'

interface textEditorProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}


const TextEditor: FC<textEditorProps> = ({ visible, setVisible }) => {

    return (
        <>
            <div className='absolute top-0 right-0 w-full flex justify-end items-center pr-5 pt-5 z-50'>
                <button
                    onClick={() => setVisible(!visible)}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                    <FontAwesomeIcon icon={faBars} />
                </button>
            </div>
            {
                visible &&
                <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center'>
                    <div className='m-5 w-[50%] h-[80%] bg-white p-3 rounded-lg'>
                        <textarea className='bg-white border-2 border-gray-100 w-full h-full text-black focus:outline-0 rounded-lg resize-none' />
                    </div>
                </div>
            }
        </>);
}

export default TextEditor