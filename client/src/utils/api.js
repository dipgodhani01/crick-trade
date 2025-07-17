import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const googleAuth = (code) => api.get(`/auth/google?code=${code}`);
export const userProfile = () => api.get(`/auth/profile`);
