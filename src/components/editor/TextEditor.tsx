import { FC } from 'react'
import { useCtx } from '../../Ctx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

interface textEditorProps {
    visible: boolean,
    setVisible: (st: boolean) => void,
    frontCtx: string,
    onFrontPageChange: (e: any) => void,
    backCtx: string,
    onBackPageChange: (e: any) => void
}

const TextEditor: FC<textEditorProps> = ({ visible, setVisible, frontCtx, backCtx, onBackPageChange, onFrontPageChange }) => {
    const { focusedBook } = useCtx();
    return (
        <>
            {
                visible &&
                <div onClick={e => { e.stopPropagation(); setVisible(false) }} className={`${visible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center flex-col items-center`}>
                    {focusedBook === null && <div className="rounded-lg p-3 text-black bg-yellow-200 m-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-600 mr-3" />
                        You are not Focus on any book and page! Please choose a book and open page you want to write first!
                    </div>}
                    <div onClick={e => { e.stopPropagation() }} className='m-5 w-[50%] h-[80%] bg-paper p-3 rounded-lg flex shadow-xl'>
                        <textarea
                            className='bg-paper w-full h-full text-black text-base focus:outline-0 rounded-lg resize-none textarea-scrollbar'
                            value={frontCtx}
                            onChange={onFrontPageChange}
                        />
                        <div className='border-r-2 border-lightPaper border-l-2 mr-1'></div>
                        <textarea
                            className='bg-paper w-full h-full text-black text-base focus:outline-0 rounded-lg resize-none textarea-scrollbar'
                            value={backCtx}
                            onChange={onBackPageChange}
                        />
                    </div>
                </div>
            }
        </>
    )
}

export default TextEditor