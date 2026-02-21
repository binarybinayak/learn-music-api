import { PORT } from "@learn-music-app/shared";

export const getApiBaseUrl = () => {
  return import.meta.env.MODE === "production"
    ? window.location.origin + "/api"
    : "http://localhost:" + PORT + "/api";
};

export const getSoundsBaseUrl = () => {
  return import.meta.env.MODE === "production"
    ? window.location.origin + "/sounds"
    : "http://localhost:" + PORT + "/sounds";
};
