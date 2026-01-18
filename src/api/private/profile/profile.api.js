import privateApi from "../../axiosPrivate";

export const createProfile = (payload) => privateApi.post('profile', payload);