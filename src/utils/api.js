// src/utils/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

let isRefreshing = false;
let subscribers = [];

function onRefreshed(newToken) {
  subscribers.forEach((cb) => cb(newToken));
  subscribers = [];
}
function addSubscriber(cb) {
  subscribers.push(cb);
}

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original?._retry) {
      const refresh = localStorage.getItem('refresh_token');
      if (!refresh) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise((resolve) => {
          addSubscriber((newToken) => {
            original.headers.Authorization = `Bearer ${newToken}`;
            resolve(API(original));
          });
        });
      }

      original._retry = true;
      isRefreshing = true;
      try {
        const resp = await axios.post('http://127.0.0.1:8000/api/token/refresh/', { refresh });
        const newAccess = resp.data?.access;
        if (!newAccess) throw new Error('No access token returned');
        localStorage.setItem('access_token', newAccess);
        isRefreshing = false;
        onRefreshed(newAccess);
        original.headers.Authorization = `Bearer ${newAccess}`;
        return API(original);
      } catch (e) {
        isRefreshing = false;
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login';
        return Promise.reject(e);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
