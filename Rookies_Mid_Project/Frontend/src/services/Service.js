import { httpClient } from "../httpClient/httpClient";

export const getListBook = async () => {
    const response = await httpClient.get("books");
    return response.data;
}

export const getListBookByTitle = async (title) => {
    const response = await httpClient.get(`books/search?title=${title}`);
    return response.data;
}

export const getDetailBook = async (id) => {
    const response = await httpClient.get(`books/${id}`)
    return response.data
}

export const createBook = async (body) => {
    return await httpClient.post('books', body)
}

export const updateBook = async (id, body) => {
    return await httpClient.put(`books/${id}`, body)
}

export const deleteBook = async (id) => {
    return await httpClient.delete(`books/${id}`)
}

export const getListCategories = async () => {
    const response = await httpClient.get("categories");
    return response.data;
}

export const getDetailCategory = async (id) => {
    const response = await httpClient.get(`categories/${id}`)
    return response.data
}

export const createCategory = async (body) => {
    return await httpClient.post('categories', body)
}

export const updateCategory = async (id, body) => {
    const abc = httpClient.put(`categories/${id}`, body)
    return await abc
}

export const deleteCategory = async (id) => {
    return await httpClient.delete(`category/${id}`)
}

export const loginUser = async (body) => {
    try {
        const response = await httpClient.post('/auth/login', body);
        const token = response.data;
        localStorage.setItem('token', token);
        return token;
    } catch (error) {
        console.error('Login error', error);
        throw error;
    }
}

export const registerUser = async (body) => {
    try {
        await httpClient.post('/auth/register', body)
    } catch (error) {
        console.error('Register error', error);
        throw error;
    }
}

export const getRequest = async () => {
    var response = await httpClient.get('borrow-requests/request')
    return response.data
}

export const postRequest = async (body) => {
    var response = await httpClient.post('borrow-requests/request', body)
    return response.data
}

export const approveRequest = async (id) => {
    var response = await httpClient.post(`borrow-requests/request/${id}/approve`)
    return response.data
}

export const rejectRequest = async (id) => {
    var response = await httpClient.post(`borrow-requests/request/${id}/reject`)
    return response.data
}
