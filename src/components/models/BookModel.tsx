import { FC, useEffect, useRef, useState } from "react"
import Book from "../../objects/Book"
import PageModel from "./PageModel"
import { useFrame, useThree } from "@react-three/fiber"
import { POSITION } from "../../constants/BookShelfConstant"
import { BOOK_STATE } from "../../constants/BookConstant"
import { useCtx } from "../../Ctx"

interface bookProps {
    book: Book,
    index: number,
    currentState: string,
    toState: string,
}

const BookModel: FC<bookProps> = ({ book, index, currentState }) => {

    const { camera } = useThree();
    const bookRef = useRef<any>(null);
    book.setBookRef(bookRef);
    const [oldPosition, setOldPosition] = useState<any>(null);
    const [isMoved, setIsMoved] = useState<boolean>(false);
    const [iBook, setIBook] = useState<Book>(book);
    const { openedPage, setOpenedPage, focusedBook, setFocusBook } = useCtx();

    function onClickFun(e: any) {
        e.stopPropagation();
        currentState !== POSITION.BACK_VIEW && setFocusBook(book);
        console.log('clicking ...')
    }

    useEffect(() => {
        setOldPosition(bookRef.current.clone());
    }, [])

    useEffect(() => {
        if (book.bookState === BOOK_STATE.FRONT) {
            if (openedPage > book.pages.length) {
                setOpenedPage(book.pages.length);
            }
            iBook.setOpenPage(openedPage);
            setIBook(iBook);
        }

    }, [openedPage]);

    useFrame(() => {
        if (!bookRef.current) return;
        if (book === focusedBook && currentState !== POSITION.BACK_VIEW) {
            if (book.bookState === BOOK_STATE.IN_SHELF || book.bookState === BOOK_STATE.MOVING) {
                book.moveToFrontLocation(camera) ?
                    (book.setBookState(BOOK_STATE.MOVING), setIBook(book)) :
                    (book.setBookState(BOOK_STATE.FRONT), setIBook(book));
                setIsMoved(true);
            }
        }
        else if (isMoved && book !== focusedBook) {
            book.moveToOldPosition(oldPosition) ?
                (book.setBookState(BOOK_STATE.MOVING), setIBook(book)) :
                (book.setBookState(BOOK_STATE.IN_SHELF), setIBook(book), setIsMoved(false));
        }
    })

    const onMouseOver = (e: any) => {
        e.stopPropagation();
    }

    return (
        <group
            ref={bookRef}
            position={[0, 0, -0.45 + (0.002 * index) + (index * book.numberofPages * (book.pages[0].THICKNESS))]}
            rotation={[0, 0, 0]}
        >
            <mesh
                onPointerEnter={onMouseOver}
                onClick={onClickFun}
            >
                {
                    book.pages.map((page, index) => (
                        <PageModel
                            page={page}
                            key={index}
                            index={index}
                            opened={false}
                            currentState={currentState}
                            book={iBook}
                        />
                    ))
                }
            </mesh>
        </group>
    )
}

export default BookModel