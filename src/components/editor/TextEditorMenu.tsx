import { faFloppyDisk, faKeyboard, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, useState } from 'react'
import { useCtx } from '../../Ctx'
import { useMutation } from 'react-query'
import { addUpdatePages } from '../../api/common'
import Loading from '../loading/Loading'
import Notification from '../notification/Notification'


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

    const { requestPagesChange, username } = useCtx();
    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });



    const mutation = useMutation(addUpdatePages, {
        onSuccess: (data) => {
            console.log(data)
            setNoti({ ...noti, message: `Successfully write ${data.no} pages to your account`, show: true, type: 'error' });
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

    return (
        <>

            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            <Loading visible={mutation.isLoading} />
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