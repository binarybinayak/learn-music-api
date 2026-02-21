import axios from "axios";
import { PORT } from "@learn-music-app/shared";

const baseURL =
  import.meta.env.MODE === "production"
    ? window.location.origin + "/api"
    : "http://localhost:" + PORT;

export const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
