import { FC, useState } from "react"
import { useCtx } from "../../Ctx";
import Book from "../../objects/Book";


interface newBookProps {
    visible: boolean;
    setVisible: (cond: boolean) => void;
}


const NewBook: FC<newBookProps> = ({ visible, setVisible }) => {

    const { booStorage, updateBookStorage } = useCtx();
    const [shelfNo, setShelfNo] = useState<number>(1);

    const addBookSubmit = (e: any) => {
        e.preventDefault();
        setVisible(false);
        console.log(shelfNo);
        updateBookStorage([...booStorage, new Book(10, [], shelfNo)])
    }

    return (
        <div
            onClick={e => { e.stopPropagation(); setVisible(false) }}
            className={`${visible ? 'block' : 'hidden'} absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-40`}>

            <form onClick={e => e.stopPropagation()} onSubmit={addBookSubmit} className="bg-white w-[30%] p-10 rounded-lg">
                <div className="mb-4">
                    <label htmlFor="shelfNumber" className="block text-sm font-medium text-gray-700">Shelf Number</label>
                    <select
                        id="shelfNumber"
                        value={shelfNo}
                        onChange={(e) => { e.stopPropagation(); setShelfNo(parseInt(e.target.value)) }}
                        required
                        className="bg-white text-black mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    CREATE
                </button>
            </form>
        </div>
    )
}

export default NewBook