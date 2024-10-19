import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `https://evangadi-forum-backend-9yd1.onrender.com/api`,
});

export default axiosInstance;
