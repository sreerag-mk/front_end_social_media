import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
});

instance.interceptors.request.use(async req => {
    const auth = JSON.parse(localStorage.getItem('userInfo') ?? '{ }')
    req.headers.Authorization = `Bearer ${auth}`
    return req
})



export default instance