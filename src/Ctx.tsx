import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Book from './objects/Book';
import { books } from './demo/data';
import axios from 'axios';
import Page from './objects/Page';

interface ctxProps {
    openedPage: number;
    setOpenedPage: (newState: number) => void;

    booStorage: Book[],
    updateBookStorage: (newState: Book[]) => void;

    bookContents: any[],
    updateBookContents: (newState: any[]) => void;

    focusedBook: Book | null,
    setFocusBook: (newState: Book | null) => void;

    focusedFrontPage: Page | null,
    setFocusFrontPage: (newStaate: Page | null) => void;

    focusedBackPage: Page | null,
    setFocusBackPage: (newStaate: Page | null) => void;
}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [focusedBook, setFocusBook] = useState<Book | null>(null);

    const [focusedFrontPage, setFocusFrontPage] = useState<Page | null>(null);
    const [focusedBackPage, setFocusBackPage] = useState<Page | null>(null);

    const [booStorage, updateBookStorage] = useState<Book[]>([new Book(10,books[1])]);
    const [bookContents, updateBookContents] = useState<any>([]);

    useEffect(() => {
        axios.get<Book[]>('http://localhost:3000/books')
            .then(response => {
                let data = response.data;
                let cx = []
                for (let key in data) {
                    cx.push(data[key]);
                }

                updateBookContents(cx);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);




    return (
        <Ctx.Provider value={{ openedPage, setOpenedPage, booStorage, updateBookStorage, focusedBook, setFocusBook, focusedFrontPage, setFocusFrontPage, focusedBackPage, setFocusBackPage, bookContents, updateBookContents }}>
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
