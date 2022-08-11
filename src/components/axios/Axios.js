import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  },
});

export default instance;
