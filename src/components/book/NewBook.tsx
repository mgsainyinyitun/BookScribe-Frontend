import { FC, useEffect, useState } from "react"
import { useCtx } from "../../Ctx";
import Book from "../../objects/Book";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useMutation } from "react-query";
import { addBook } from "../../api/common";
import { SHELF_ID } from "../../constants/BookShelfConstant";
import Notification from "../notification/Notification";

interface newBookProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}

const NewBook: FC<newBookProps> = ({ visible, setVisible }) => {

    const { bookStorage, updateBookStorage } = useCtx();
    const [shelfNo, setShelfNo] = useState<number>(1);
    const [noOfPages, setNoOfPages] = useState<number>(20);
    const { username, setLoading } = useCtx();

    const [noti, setNoti] = useState({
        message: '',
        type: 'success',
        show: false,
    });

    const mutation = useMutation(addBook, {
        onSuccess: (data) => {
            const nb = new Book(noOfPages, [], shelfNo);
            nb.setBookId(data.id);
            updateBookStorage([...bookStorage, nb])
            setVisible(false);
            setNoti({ ...noti, message: "Successfully create new Book!", show: true, type: 'success' });
        },
        onError: (error) => {
            console.error('Error adding book:', error);
            setNoti({ ...noti, message: "Error in create new Book! Please Try again", show: true, type: 'error' });
        }
    });

    const addBookSubmit = (e: any) => {
        e.preventDefault();
        const dt = {
            type: 'PRIVATE',
            numberOfPage: noOfPages,
            shelfNumber: SHELF_ID[shelfNo]
        }
        if (username.length !== 0) {
            mutation.mutate(dt);
        } else {
            updateBookStorage([...bookStorage, new Book(noOfPages, [], shelfNo)])
            setNoti({ ...noti, message: "Successfully create new Book!", show: true, type: 'success' });
            setVisible(false);
        }
    }

    useEffect(() => {
        setLoading(mutation.isLoading);
    }, [mutation.isLoading])

    return (
        <>
            <Notification
                noti={noti}
                setNoti={setNoti}
            />
            <div
                onClick={e => { e.stopPropagation(); setVisible(false) }}
                className={`${visible ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40`}>

                <form onClick={e => e.stopPropagation()} onSubmit={addBookSubmit} className="bg-white w-[30%] p-10 rounded-3xl animate-slideIn">

                    <div className='flex justify-end mr-3'>
                        <FontAwesomeIcon icon={faClose} className='text-red-700 font-bold text-2xl' onClick={() => setVisible(false)} />
                    </div>


                    {username.length === 0 && <div className="rounded-lg p-3 text-black bg-yellow-200 m-3 flex justify-center items-center">
                        <FontAwesomeIcon icon={faTriangleExclamation} className="text-yellow-600 mr-3" />
                        You are not sign-in and the new book will not be saved!
                    </div>}

                    <div className='flex flex-col justify-center items-center gap-3 mb-5'>
                        <h1 className='text-gray-700 text-2xl'>Add New Book</h1>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="shelfNumber" className="block text-sm font-medium text-gray-700">Shelf Number : </label>
                        <select
                            id="shelfNumber"
                            value={shelfNo}
                            onChange={(e) => { e.stopPropagation(); setShelfNo(parseInt(e.target.value)) }}
                            required
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="noOfPages" className="block text-sm font-medium text-gray-700">Number Of Pages : </label>
                        <select
                            id="noOfPages"
                            value={noOfPages}
                            onChange={(e) => { e.stopPropagation(); setNoOfPages(parseInt(e.target.value)) }}
                            required
                            className="bg-white text-black mt-1 block w-full px-3 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                        </select>
                    </div>

                    <button
                        disabled={mutation.isLoading}
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-3 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        CREATE
                    </button>
                </form>
            </div>
        </>
    )
}

export default NewBook