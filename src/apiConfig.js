
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("VITE_API_URL is not configured!");
} else {
  axios.defaults.baseURL = API_URL;
}
