import publicApi from '../axiosPublic';

export const createUser = (payload) => publicApi.post('create-user', payload);
export const verifyEmail = (payload) => publicApi.post('verify-email', payload);
export const login = (payload) => publicApi.post('login', payload);
