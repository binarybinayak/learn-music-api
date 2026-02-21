import axios from "axios";
import { getApiBaseUrl } from "../utils/apiHelpers";

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});
