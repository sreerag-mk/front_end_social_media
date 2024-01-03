/* eslint-disable prettier/prettier */
import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASEURL,
});

instance.interceptors.request.use(async (req) => {
    const auth = JSON.parse(localStorage.getItem('userInfo') ?? '{ }');
    req.headers.Authorization = `Bearer ${auth}`;
    return req;
});

export default instance;
