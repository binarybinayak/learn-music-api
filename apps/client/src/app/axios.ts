import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? window.location.origin + "/api"
    : "http://localhost:" + import.meta.env.VITE_PORT;

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
