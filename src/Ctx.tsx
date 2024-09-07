import React, { createContext, useContext, useState, ReactNode } from 'react';
import Book from './objects/Book';
import { books } from './demo/data';


interface ctxProps {
    openedPage: number;
    setOpenedPage: (newState: number) => void;

    booStorage: Book[],
    updateBookStorage: (newState: Book[]) => void;

    focusedBook: Book | null,
    setFocusBook: (newState: Book | null) => void;

}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [booStorage, updateBookStorage] = useState<Book[]>([new Book(10, books[1]), new Book(10, books[1])]);
    const [focusedBook, setFocusBook] = useState<Book | null>(null);

    return (
        <Ctx.Provider value={{ openedPage, setOpenedPage, booStorage, updateBookStorage, focusedBook, setFocusBook }}>
            {children}
        </Ctx.Provider>
    );
};

export const useCtx = () => {
    const context = useContext(Ctx);
    if (context === undefined) {
        throw new Error('useCtx must be used within a Provider');
    }
    return context;
};
