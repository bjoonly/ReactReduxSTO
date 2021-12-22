import axios from "axios";
export const url = "http://local.laravel.local.php.com:100/";
const myAxios = axios.create({
    baseURL: url,
    headers: {
        "Content-type": "application/json",
    }
});
myAxios.interceptors.request.use(
    (config) => {
        let token = localStorage.getItem('token')

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default myAxios