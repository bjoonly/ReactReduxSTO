import axios from "axios";

export default axios.create({
    baseURL: "http://local.laravel.local.php.com:100/",
    headers: {
        "Content-type": "application/json"
    }
});