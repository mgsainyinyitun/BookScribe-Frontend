import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Book from './objects/Book';
import Page from './objects/Page';
import { getPrivateBooks, getPublicBook, validateToken } from './api/common';
import { SHELF_ID } from './constants/BookShelfConstant';

interface ctxProps {
    openedPage: number;
    setOpenedPage: (newState: number) => void;

    bookStorage: Book[],
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

    modalTitle: string,
    modalCtx: string,
    modalVisible: boolean,

    setModalTitle: (s: string) => void,
    setModalCtx: (s: string) => void,
    setModalVisible: (c: boolean) => void,
    modalAccept: boolean,
    setModalAccept: (mf: any) => void,

    bookReload: () => void;

}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [focusedBook, setFocusBook] = useState<Book | null>(null);

    const [focusedFrontPage, setFocusFrontPage] = useState<Page | null>(null);
    const [focusedBackPage, setFocusBackPage] = useState<Page | null>(null);

    const [bookStorage, updateBookStorage] = useState<Book[]>([]); // new Book(10,["temp page"],3)

    const [requestPagesChange, setRequestPagesChange] = useState<any[]>([]);

    const [api] = useState(import.meta.env.VITE_APP_API_BASE);

    const [username, setUsername] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);

    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalCtx, setModalCtx] = useState<string>('');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const [modalAccept, setModalAccept] = useState<boolean>(false);

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

        updateBookStorage([...bookStorage, ...cx])
    }

    const bookReload = () => {
        updateBookStorage([]);
        if (username.length !== 0) {
            getPrivateBooks(updateBookStorageFun);
        }
        getPublicBook(api, updateBookStorageFun);
    };

    useEffect(() => {
        bookReload();
    }, [username])

    useEffect(() => {
        validateToken(setUsername);
    }, []);

    return (
        <Ctx.Provider value={{ api, openedPage, setOpenedPage, bookStorage, updateBookStorage, focusedBook, setFocusBook, focusedFrontPage, setFocusFrontPage, focusedBackPage, setFocusBackPage, username, setUsername, requestPagesChange, setRequestPagesChange, loading, setLoading, modalTitle, setModalTitle, modalCtx, setModalCtx, modalVisible, setModalVisible, modalAccept, setModalAccept, bookReload }}>
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

