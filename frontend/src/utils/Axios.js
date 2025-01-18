import axios from "axios";

const baseURL = "http://localhost:5000";

const Axios = axios.create({
    baseURL,
    withCredentials: true,
})

export default Axios;