import { faFloppyDisk, faKeyboard, faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useEffect, useState } from 'react'
import { useCtx } from '../../Ctx'
import { useMutation } from 'react-query'
import { addUpdatePages, deleteBook } from '../../api/common'
import Notification from '../notification/Notification'
import Book from '../../objects/Book'


interface textEditorProps {
    menuVisible: boolean,
    setTextEditorVisible: (st: boolean) => void,
    textEditorVisible: boolean,
    setNewBookVisible: (st: boolean) => void,
    onChangeSave: (e: any) => void,
    isFrontChanged: boolean,
    isBackChanged: boolean
}

const TextEditorMenu: FC<textEditorProps> = ({ menuVisible, setTextEditorVisible, setNewBookVisible, onChangeSave, isFrontChanged, isBackChanged, textEditorVisible }) => {

    const { setFocusBook, requestPagesChange, username, setLoading, focusedBook, setModalCtx, setModalTitle, setModalVisible, modalAccept, setModalAccept, updateBookStorage, bookStorage } = useCtx();
    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });
    const [toDeleteBook, setToDeleteBook] = useState<Book>();


    const mutation = useMutation(addUpdatePages, {
        onSuccess: (data) => {
            console.log(data)
            setNoti({ ...noti, message: `Successfully write ${data.no} pages to your account`, show: true, type: 'success' });
        },
        onError: (err) => {
            console.log(err);
            setNoti({ ...noti, message: "Something wrong! Please try again", show: true, type: 'error' });
        }
    });

    const deletMutation = useMutation(deleteBook, {
        onSuccess: (data) => {
            setFocusBook(null);
            updateBookStorage([...bookStorage.filter(b => b.bookId !== data.id)]);
            setNoti({ ...noti, message: `Successfully delete with id ${data.id}.`, show: true, type: 'success' });
        },
        onError: (err) => {
            console.log(err);
            setNoti({ ...noti, message: "Something wrong! Please try again", show: true, type: 'error' });
        }
    })


    const onPageUpload = () => {
        if (requestPagesChange.length !== 0 && username.length !== 0) {

            mutation.mutate(requestPagesChange);
        } else {
            if (username.length === 0) {
                setNoti({ ...noti, message: "You are not login! Please login and try again", show: true, type: 'error' });
            }
        }
    }


    const onBookDelete = () => {
        if (focusedBook) {
            if (username !== focusedBook.owner) {
                setNoti({ ...noti, message: "You cannot delete this book!", show: true, type: 'error' });
                return;
            }
            setModalTitle("Delete This Book?")
            setModalCtx("Are you sure you want to delete this book! This cannot be undone.")
            setModalVisible(true);
            setToDeleteBook(focusedBook);
        } else {
            setNoti({ ...noti, message: "Please open a book you want to delete", show: true, type: 'error' });
        }
    }


    useEffect(() => {
        if (modalAccept === true && toDeleteBook) {
            deletMutation.mutate(toDeleteBook.bookId);
            setModalAccept(false);
        }
    }, [modalAccept])

    useEffect(() => {
        setLoading(mutation.isLoading);
    }, [mutation.isLoading])

    return (
        <>

            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            {
                menuVisible && (<>
                    <div className={` ${menuVisible ? 'animate-slideIn' : 'animate-slideOut opacity-0'} flex flex-col items-end gap-2`}>

                        <div className='relative group'>
                            <button
                                onClick={() => setNewBookVisible(true)}
                                className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                                Add new Book to your book shelf.
                            </div>
                        </div>

                        <div className='relative group'>
                            <button
                                onClick={() => setTextEditorVisible(!textEditorVisible)}
                                className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                <FontAwesomeIcon icon={faKeyboard} />
                            </button>

                            <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                                Write something on the book's pages
                            </div>
                        </div>

                        <div className='relative group'>
                            <button
                                onClick={onBookDelete}
                                className={`w-12 h-12 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600'}`}>
                                <FontAwesomeIcon icon={faTrash} className='text-red-500' />
                            </button>

                            <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                                Delte your own current focus book.
                            </div>
                        </div>

                        <div className='relative group'>
                            <button
                                onClick={isFrontChanged || isBackChanged ? onChangeSave : undefined}
                                className={`w-12 h-12 ${isFrontChanged || isBackChanged ? 'bg-blue-800 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg}`}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </button>
                            <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                                Save Current writing on Page.
                            </div>
                        </div>

                        <div className='relative group'>
                            <button
                                onClick={onPageUpload}
                                className={`w-12 h-12 ${requestPagesChange.length !== 0 ? 'bg-blue-800 hover:bg-blue-600' : 'bg-gray-400'} text-white rounded-full flex items-center justify-center shadow-lg}`}>
                                <FontAwesomeIcon icon={faUpload} />
                            </button>
                            <div className="absolute top-0 min-w-36 right-14 bg-gray-800 text-white text-sm px-2 py-1 rounded-md shadow-md hidden group-hover:block">
                                Upload current writing to account.
                            </div>
                        </div>
                    </div>
                </>)
            }
        </>
    )
}

export default TextEditorMenu