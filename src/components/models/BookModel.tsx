import { FC } from "react"
import Book from "../../objects/Book"
import PageModel from "./PageModel"


interface bookProps {
    book: Book
}

const pages = Array.from({ length: 30 }, (_, index) => index + 1);

const BookModel: FC<bookProps> = ({ book }) => {
    return (
        <group>
            {
                pages.map((page, index) => (
                    <PageModel key={index} index={index} pages={pages} opened={false} />
                ))
            }
        </group>
    )
}

export default BookModel