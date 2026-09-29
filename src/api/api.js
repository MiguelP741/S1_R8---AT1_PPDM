import axios from "axios";

const api = axios.create({
  baseURL: "https://pvz-2-api.vercel.app/api"
});

export default api;