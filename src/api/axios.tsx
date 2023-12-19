import axios from 'axios';

const user: string | null = localStorage.getItem('userInfo');
let userparse: string | null = null;
userparse = JSON.parse(user);
const headers = {
    'Authorization': `Bearer ${userparse}`
};

console.log('the headers are ____________________________________________________________')
console.log(headers)

const instance = axios.create({
    baseURL: 'http://localhost:5000',
    headers: headers
});



export default instance