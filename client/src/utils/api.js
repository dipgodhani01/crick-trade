import axios from 'axios';
const api = axios.create({
    // baseURL: process.env.BASE_URL
    baseURL: `http://localhost:4300/api`
})

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);