import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Book from './objects/Book';
import axios from 'axios';
import Page from './objects/Page';
import { getPrivateBooks, validateToken } from './api/common';
import { SHELF_ID } from './constants/BookShelfConstant';

interface ctxProps {
    openedPage: number;
    setOpenedPage: (newState: number) => void;

    booStorage: Book[],
    updateBookStorage: (newState: Book[]) => void;

    focusedBook: Book | null,
    setFocusBook: (newState: Book | null) => void;

    focusedFrontPage: Page | null,
    setFocusFrontPage: (newStaate: Page | null) => void;

    focusedBackPage: Page | null,
    setFocusBackPage: (newState: Page | null) => void;

    requestPagesChange: any[]
    setRequestPagesChange: (newState: any[]) => void;

    api: string,

    username: string,
    setUsername: (newState: string) => void;

    loading: boolean,
    setLoading: (newState: boolean) => void;
}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [focusedBook, setFocusBook] = useState<Book | null>(null);

    const [focusedFrontPage, setFocusFrontPage] = useState<Page | null>(null);
    const [focusedBackPage, setFocusBackPage] = useState<Page | null>(null);

    const [booStorage, updateBookStorage] = useState<Book[]>([]); // new Book(10,["temp page"],3)

    const [requestPagesChange, setRequestPagesChange] = useState<any[]>([]);

    const [api] = useState(import.meta.env.VITE_APP_API_BASE);

    const [username, setUsername] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);



    const updateBookStorageFun = (ctx: any) => {
        let cx: Book[] = [];

        ctx.map((c: any) => {
            const bt = new Book(c.numberOfpage, c.text);
            bt.setBookId(c.id);
            bt.setBookType(c.bookType);
            bt.setOwner(c.owner);
            if (SHELF_ID[c.shelf]) {
                bt.setShelfId(parseInt(SHELF_ID[c.shelf]));
            } else {
                bt.setShelfId(SHELF_ID.SHELF_UPPER);
            }
            cx.push(bt);
        })

        updateBookStorage([...booStorage, ...cx])
    }

    useEffect(() => {
        if (username.length !== 0) {
            getPrivateBooks(updateBookStorageFun);
        }
    }, [username])



    useEffect(() => {

        validateToken(setUsername);

        axios.get<Book[]>(`${api}/books/public`, { params: {} })
            .then(response => {
                updateBookStorageFun(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    return (
        <Ctx.Provider value={{ api, openedPage, setOpenedPage, booStorage, updateBookStorage, focusedBook, setFocusBook, focusedFrontPage, setFocusFrontPage, focusedBackPage, setFocusBackPage, username, setUsername, requestPagesChange, setRequestPagesChange, loading, setLoading }}>
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

