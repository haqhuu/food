import axios from "axios";

// Set config defaults when creating the instance
const instance = axios.create({
    // baseURL: import.meta.env.VITE_APP_URL_API
    baseURL: 'http://food.local/api'
});

// // Alter defaults after instance has been created
// instance.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("jwt")}`;

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = err.response?.status || 500;
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            return Promise.reject(err.message, 409);
        }

        // forbidden (permission related issues)
        case 403: {
            return Promise.reject(err.message, 409);
        }

        // bad request
        case 400: {
            return Promise.reject(err.message, 400);
        }

        // not found
        case 404: {
            return Promise.reject(err.message, 404);
        }

        // conflict
        case 409: {
            return Promise.reject(err.message, 409);
        }

        // unprocessable
        case 422: {
            return Promise.reject(err.message, 422);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(err.message, 500);

            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            // return Promise.reject(error);
        }
    }
});
export default instance;