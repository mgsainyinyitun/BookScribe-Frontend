import { FC } from 'react'
import { POSITION } from '../../constants/BookShelfConstant'
import { useCtx } from '../../Ctx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faCaretLeft, faHome } from '@fortawesome/free-solid-svg-icons';

interface controlProps {
    controlBtnClick: (arg: string) => void,
    currentState: string,
}

const Controls: FC<controlProps> = ({ controlBtnClick, currentState }) => {

    const { openedPage, setOpenedPage, focusedBook, setFocusBook } = useCtx();

    const handlePreviousClick = () => {
        if (openedPage <= 0) {
            setOpenedPage(0);
        } else {
            setOpenedPage(openedPage - 1);
        }
    }

    const handleNextClick = () => {
        if (focusedBook) {
            if (openedPage >= focusedBook.pages.length) {
                setOpenedPage(0);
            } else {
                setOpenedPage(openedPage + 1);
            }
        }
    }
    return (
        <>
            {/** Previous and Next */}
            <div className={`w-full h-20 fixed bottom-1/2 right-0 flex justify-between px-10 items-center 
                ${focusedBook !== null ? 'block' : 'hidden'}
                `}>
                <button
                    onClick={handlePreviousClick}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.CENTET_SHELF ? 'bg-violet-500' : ''}`}>
                    <FontAwesomeIcon icon={faCaretLeft} />
                </button>
                <button
                    onClick={handleNextClick}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 ${currentState === POSITION.CENTET_SHELF ? 'bg-violet-500' : ''}`}>
                    <FontAwesomeIcon icon={faCaretRight} />
                </button>
            </div>
            {/** changing shelf */}
            <div className='w-full h-20 fixed bottom-0 right-0 flex justify-center items-center gap-2'>
                <button
                    onClick={() => { controlBtnClick(POSITION.CENTET_SHELF); setFocusBook(null) }}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 ${currentState === POSITION.CENTET_SHELF ? 'bg-violet-500' : ''}`}>
                    {POSITION.CENTET_SHELF}
                </button>

                <button
                    onClick={() => { controlBtnClick(POSITION.UP_SHELF); setFocusBook(null) }}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 ${currentState === POSITION.UP_SHELF ? 'bg-violet-500' : ''}`}>
                    {POSITION.UP_SHELF}
                </button>

                <button
                    onClick={() => { controlBtnClick(POSITION.LOW_SHELF); setFocusBook(null) }}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 ${currentState === POSITION.LOW_SHELF ? 'bg-violet-500' : ''}`}>
                    {POSITION.LOW_SHELF}
                </button>

                <button
                    onClick={() => { controlBtnClick(POSITION.BACK_VIEW); setFocusBook(null) }}
                    className={`w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 ${currentState === POSITION.BACK_VIEW ? 'bg-violet-500' : ''}`}>
                    <FontAwesomeIcon icon={faHome}/>
                </button>
            </div>
        </>
    )
}

export default Controls