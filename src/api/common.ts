import api from "../api";

export const addBook = async (book: any) => {
    const response = await api.post('/books/add', book);
    return response.data;
};


export const addUpdatePages = async(pages:any) => {
    const response = await api.post('/pages/add-multi',pages);
    return response.data;
}