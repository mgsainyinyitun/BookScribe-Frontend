import api from "../api";

export const addBook = async (book: any) => {
    const response = await api.post('/books/add', book);
    return response.data;
};


export const addUpdatePages = async (pages: any) => {
    const response = await api.post('/pages/add-multi', pages);
    return response.data;
}

export const validateToken = (setUsername: (nm: string) => void) => {
    api.post('/auth/validate')
        .then(res => {
            setUsername(res.data);
        })
        .catch(err => {
            console.log(err);
        });
}

export const getPrivateBooks = (updateBookContentsFun: (data: any) => void) => {
    api.get('/books/private')
        .then(res => {
            updateBookContentsFun(res.data);
        })
        .catch(err => {
            console.log(err);
        })
}