import { axiosInstance } from './axiosinstance'

export const RegisterUser = async (payload) => {
    try {
        const response=await axiosInstance.post ('/api/users/register',payload)
    } catch (error) {
        throw error;
    }
}
//login a user
export const LoginUser = async (payload) => {
    try {
        const response = await axiosInstance.post('/api/users/login', payload);
    return response.data;

    }
    catch (error) {
        throw error;
}
}
