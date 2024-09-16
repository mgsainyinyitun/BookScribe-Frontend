import { faList,faXmark } from '@fortawesome/free-solid-svg-icons';

import { FC, useEffect, useState } from 'react'
import { useCtx } from '../../Ctx';
import TextEditor from './TextEditor';
import TextEditorMenu from './TextEditorMenu';
import Notification from '../notification/Notification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface textEditorProps {
    setNewBookVisible: (cond: boolean) => void;
}

const TextEditorWraper: FC<textEditorProps> = ({ setNewBookVisible }) => {

    const [menuVisible, setMenuVisible] = useState(false);
    const [textEditorVisible, setTextEditorVisible] = useState(false);
    const { focusedBook, openedPage, setFocusFrontPage, setFocusBackPage, requestPagesChange, setRequestPagesChange } = useCtx();

    const [frontCtx, setFrontCtx] = useState<string>('');
    const [backCtx, setBackCtx] = useState<string>('');

    const [isFrontChanged, setIsFrontChanged] = useState<boolean>(false);
    const [isBackChanged, setIsBackChanged] = useState<boolean>(false);

    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });


    const onFrontPageChange = (e: any) => {
        setFrontCtx(e.target.value);
        setIsFrontChanged(true);
    }

    const onBackPageChange = (e: any) => {
        setBackCtx(e.target.value);
        setIsBackChanged(true);
    }

    const onChangeSave = () => {

        if (focusedBook) {
            if (isFrontChanged && focusedBook && !isBackChanged) { // front page is (second page of page index) pageIndex * 2
                // front page change 
                focusedBook.pages[openedPage].setBackCtx(frontCtx);
                setFocusFrontPage(focusedBook.pages[openedPage].shallowClone());

                const pg = {
                    number: focusedBook.pages[openedPage].pageIndex * 2, // page number on database,
                    bookId: focusedBook.bookId,
                    contexts: frontCtx
                }
                setRequestPagesChange([...requestPagesChange, { ...pg }])

            } else if (isBackChanged && focusedBook && !isFrontChanged) { // back page is (first page of page index) pageIndex + (pageIndex-1)
                // back page change
                focusedBook.pages[openedPage + 1].setFrontCtx(backCtx);
                setFocusBackPage(focusedBook.pages[openedPage + 1].shallowClone())

                const pg = {
                    number: (focusedBook.pages[openedPage + 1].pageIndex) + (focusedBook.pages[openedPage + 1].pageIndex - 1),
                    bookId: focusedBook.bookId,
                    contexts: backCtx
                }
                setRequestPagesChange([...requestPagesChange, { ...pg }])

            } else if (isBackChanged && isFrontChanged && focusedBook) {
                // both page change
                focusedBook.pages[openedPage].setBackCtx(frontCtx);
                focusedBook.pages[openedPage + 1].setFrontCtx(backCtx);

                setFocusFrontPage(focusedBook.pages[openedPage].shallowClone())
                setFocusBackPage(focusedBook.pages[openedPage + 1].shallowClone())

                const fpg = {
                    number: focusedBook.pages[openedPage].pageIndex * 2,
                    bookId: focusedBook.bookId,
                    contexts: frontCtx
                }
                const bpg = {
                    number: focusedBook.pages[openedPage + 1].pageIndex + (focusedBook.pages[openedPage + 1].pageIndex - 1),
                    bookId: focusedBook.bookId,
                    contexts: backCtx
                }
                setRequestPagesChange([...requestPagesChange, fpg, bpg])
            }
            setNoti({ ...noti, message: "Successfully save !", show: true, type: 'success' });
            setTextEditorVisible(false);
            setIsFrontChanged(false);
            setIsBackChanged(false);

        } else {
            setNoti({ ...noti, message: "Contexts not saved! Please open book and open specific page and write and save again!", show: true, type: 'error' });
            setTextEditorVisible(false);
            setIsFrontChanged(false);
            setIsBackChanged(false);
        }
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
            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            <div className='absolute top-0 right-0 w-[50%] flex justify-center items-end pr-5 pt-5 z-50 flex-col gap-2'>
                <div className='flex gap-2'>
                    <div className='relative group'>
                        <button
                            onClick={() => setMenuVisible(!menuVisible)}
                            className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none'}`}>
                            {menuVisible ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faList} />}
                        </button>
                        <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                            Book management Menu.
                        </div>
                    </div>
                </div>

                <TextEditorMenu
                    menuVisible={menuVisible}
                    textEditorVisible={textEditorVisible}
                    setTextEditorVisible={setTextEditorVisible}
                    setNewBookVisible={setNewBookVisible}
                    onChangeSave={onChangeSave}
                    isFrontChanged={isFrontChanged}
                    isBackChanged={isBackChanged}
                />

            </div>
            <TextEditor
                visible={textEditorVisible}
                setVisible={setTextEditorVisible}
                frontCtx={frontCtx}
                onFrontPageChange={onFrontPageChange}
                backCtx={backCtx}
                onBackPageChange={onBackPageChange}
            />
        </>);
}

export default TextEditorWraper

// page index 1 => 1,2
// page index 2 => 3,4
// page index 3 => 5,6
// page index 4 => 7,8
// page index 5 => 9,10
// page index 6 => 11,12

