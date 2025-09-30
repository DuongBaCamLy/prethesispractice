import axios from 'axios';
// set config defaults when creating the instance
const instance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});
// alter defaults after instance has been created
//instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN';
//add a request interceptor
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});
//add a response interceptor
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});



export default instance;