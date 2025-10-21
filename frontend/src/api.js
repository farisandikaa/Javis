import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

// cek cookies masih login apa ngga
export async function checkAuth() {
  try {
    const res = await api.get("/dashboard");
    return res.data;
  } catch {
    return null;
  }
}

export default api;
