import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Book from './objects/Book';
import axios from 'axios';
import Page from './objects/Page';
import apiWithToken from './api';

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
    setFocusBackPage: (newState: Page | null) => void;

    requestPagesChange: any[]
    setRequestPagesChange: (newState: any[]) => void;

    api: string,

    username: string,
    setUsername: (newState: string) => void;
}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [focusedBook, setFocusBook] = useState<Book | null>(null);

    const [focusedFrontPage, setFocusFrontPage] = useState<Page | null>(null);
    const [focusedBackPage, setFocusBackPage] = useState<Page | null>(null);

    const [booStorage, updateBookStorage] = useState<Book[]>([new Book(10, [])]); // new Book(10,["temp page"],3)
    const [bookContents, updateBookContents] = useState<any>([]);

    const [requestPagesChange, setRequestPagesChange] = useState<any[]>([]);

    const [api] = useState(import.meta.env.VITE_APP_API_BASE);

    const [username, setUsername] = useState<string>('');

    useEffect(() => {

        apiWithToken.post('/auth/validate')
            .then(res => {
                setUsername(res.data);
            })
            .catch(err => {
                console.log(err);
            });

        axios.get<Book[]>(`${api}/books/public`, { params: {} })
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
        <Ctx.Provider value={{ api, openedPage, setOpenedPage, booStorage, updateBookStorage, focusedBook, setFocusBook, focusedFrontPage, setFocusFrontPage, focusedBackPage, setFocusBackPage, bookContents, updateBookContents, username, setUsername, requestPagesChange, setRequestPagesChange }}>
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
