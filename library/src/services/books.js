import { axiosInstance } from "./axiosinstance";

//add book
export const AddBook = async () => {
    try {
        const response=await axiosInstance.post('/api/books/add-book')
        return response.data;

    } catch (error) {
        throw error;
    }
}


