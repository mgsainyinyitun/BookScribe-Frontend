import { faKeyboard, faList, faPlus, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react'
import { useCtx } from '../../Ctx';

interface textEditorProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}


const TextEditor: FC<textEditorProps> = ({ visible, setVisible }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { focusedBook, openedPage } = useCtx();

    const [frontCtx, setFrontCtx] = useState<string>('');
    const [backCtx, setBackCtx] = useState<string>('');

    useEffect(() => {
        if (focusedBook !== null) {
            console.log(focusedBook.pages);
            console.log(openedPage);
            // 0 -> 0 =>  back
            // 1 -> 1 =>  front
            setFrontCtx(focusedBook.pages[openedPage].bctx);
            setBackCtx(focusedBook.pages[openedPage+1].fctx);
        }
    }, [focusedBook, openedPage])

    return (
        <>
            <div className='absolute top-0 right-0 w-full flex justify-center items-end pr-5 pt-5 z-50 flex-col gap-2'>
                <button
                    onClick={() => setMenuVisible(!menuVisible)}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                    {menuVisible ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faList} />}
                </button>

                {
                    menuVisible && (<>
                        <div className={` ${menuVisible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} flex flex-col items-end gap-2`}>

                            <button
                                onClick={() => setVisible(!visible)}
                                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </button>


                            <button
                                onClick={() => setVisible(!visible)}
                                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>


                            <button
                                onClick={() => setVisible(!visible)}
                                className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                                <FontAwesomeIcon icon={faSave} />
                            </button>
                        </div>
                    </>)
                }

            </div>
            {
                visible &&
                <div onClick={e => { e.stopPropagation(); setVisible(false) }} className={`${visible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center`}>
                    <div onClick={e => { e.stopPropagation() }} className='m-5 w-[50%] h-[80%] bg-paper p-3 rounded-lg flex'>
                        <textarea
                            className='bg-paper w-full h-full text-black text-base focus:outline-0 rounded-lg resize-none textarea-scrollbar'
                            value={frontCtx}
                        />
                        <div className='border-r-2 border-lightPaper border-l-2 mr-1'></div>
                        <textarea
                            className='bg-paper w-full h-full text-black text-base focus:outline-0 rounded-lg resize-none textarea-scrollbar'
                            value={backCtx}
                        />
                    </div>
                </div>
            }
        </>);
}

export default TextEditor