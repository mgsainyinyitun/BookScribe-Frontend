import { faFloppyDisk, faKeyboard, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC } from 'react'
import { useCtx } from '../../Ctx'
import { useMutation } from 'react-query'
import { addUpdatePages } from '../../api/common'


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


    const mutation = useMutation(addUpdatePages, {
        onSuccess: (data) => {
            console.log(data)
        },
        onError: (err) => {
            console.log(err);
        }
    })

    const onPageUpload = () => {
        if (requestPagesChange.length !== 0 && username.length !== 0) {
            console.log('upload', requestPagesChange);
            mutation.mutate(requestPagesChange);
        }
    }

    return (
        <>
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