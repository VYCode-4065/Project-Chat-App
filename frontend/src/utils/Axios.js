import axios from "axios";

const baseURL = 'https://project-chat-app-jjyf.onrender.com/';

const Axios = axios.create({
    baseURL,
    withCredentials: true,
})

export default Axios;