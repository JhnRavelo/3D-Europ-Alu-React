import axios from "axios";

const url = import.meta.env.VITE_SERVER_PATH;

const defaultAxios = axios.create({
  baseURL: url,
  withCredentials: true,
});

const privateAxios = axios.create({
  baseURL: url,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default defaultAxios;

export { privateAxios };
