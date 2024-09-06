import React, { createContext, useContext, useState, ReactNode } from 'react';
import { BOOK_STATE } from './constants/BookConstant';

interface ctxProps {
    openedPage: number;
    setOpenedPage: (newState: number) => void;
    bookState: string;
    setBookState: (newState: string) => void;
    haveFocusedBook: boolean;
    setHaveFocusedBook: (newState: boolean) => void;
}

const Ctx = createContext<ctxProps | undefined>(undefined);

export const CtxProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [openedPage, setOpenedPage] = useState<number>(0);
    const [bookState, setBookState] = useState<string>(BOOK_STATE.IN_SHELF);
    const [haveFocusedBook, setHaveFocusedBook] = useState<boolean>(true);

    return (
        <Ctx.Provider value={{ openedPage, setOpenedPage, bookState, setBookState, haveFocusedBook, setHaveFocusedBook }}>
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
