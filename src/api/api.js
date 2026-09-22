import axios from "axios";

const api = axios.create({
    baseURL: 'https://justmeme.wtf/api/v1/trending'
});

export default api