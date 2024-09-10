import { faFloppyDisk, faKeyboard, faL, faList, faPlus, faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, useEffect, useState } from 'react'
import { useCtx } from '../../Ctx';

interface textEditorProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
    setNewBookVisible: (cond: boolean) => void;
}


const TextEditor: FC<textEditorProps> = ({ visible, setVisible, setNewBookVisible }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const { focusedBook, openedPage, setFocusFrontPage, setFocusBackPage } = useCtx();

    const [frontCtx, setFrontCtx] = useState<string>('');
    const [backCtx, setBackCtx] = useState<string>('');

    const [isFrontChanged, setIsFrontChanged] = useState<boolean>(false);
    const [isBackChanged, setIsBackChanged] = useState<boolean>(false);


    const onFrontPageChange = (e: any) => {
        setFrontCtx(e.target.value);
        setIsFrontChanged(true);
    }

    const onBackPageChange = (e: any) => {
        setBackCtx(e.target.value);
        setIsBackChanged(true);
    }

    const onChangeSave = () => {

        if (isFrontChanged && focusedBook && !isBackChanged) {
            focusedBook.pages[openedPage].setBackCtx(frontCtx);
            setFocusFrontPage(focusedBook.pages[openedPage].shallowClone());
        } else if (isBackChanged && focusedBook && !isFrontChanged) {
            focusedBook.pages[openedPage + 1].setFrontCtx(backCtx);
            setFocusBackPage(focusedBook.pages[openedPage + 1].shallowClone())
        } else if (isBackChanged && isFrontChanged && focusedBook) {
            focusedBook.pages[openedPage].setBackCtx(frontCtx);
            focusedBook.pages[openedPage + 1].setFrontCtx(backCtx);

            setFocusFrontPage(focusedBook.pages[openedPage].shallowClone())
            setFocusBackPage(focusedBook.pages[openedPage + 1].shallowClone())
        }
        setVisible(false);
        setIsFrontChanged(false);
        setIsBackChanged(false);
    }

    useEffect(() => {
        if (focusedBook !== null && openedPage < focusedBook.pages.length) {
            setFocusFrontPage(focusedBook.pages[openedPage]);
            setFocusBackPage(focusedBook.pages[openedPage + 1]);

            setFrontCtx(focusedBook.pages[openedPage].bctx ? focusedBook.pages[openedPage].bctx : '');
            setBackCtx(focusedBook.pages[openedPage + 1] ? focusedBook.pages[openedPage + 1].fctx : '');
        } else {
            setFocusFrontPage(null);
            setFocusBackPage(null);
            setFrontCtx('');
            setBackCtx('');
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
                                className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </button>


                            <button
                                onClick={() => setNewBookVisible(true)}
                                className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>


                            <button
                                onClick={onChangeSave}
                                className={`w-12 h-12 ${isFrontChanged || isBackChanged ? 'bg-blue-800 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg}`}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </button>
                        </div>
                    </>)
                }

            </div>
            {
                visible &&
                <div onClick={e => { e.stopPropagation(); setVisible(false) }} className={`${visible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center`}>
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
        </>);
}

export default TextEditor