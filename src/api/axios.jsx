import axios from "axios";

const url = import.meta.env.VITE_SERVER_PATH;

const defaultAxios = axios.create({
  withCredentials: true,
  baseURL: url,
});

const privateAxios = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default defaultAxios;

export { privateAxios };
