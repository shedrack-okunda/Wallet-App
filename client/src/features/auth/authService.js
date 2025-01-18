import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL;

const login = async (userData) => {
  const res = await axios.post(baseURL + "/api/users/login", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const register = async (userData) => {
  const res = await axios.post(baseURL + "/api/users/register", userData);

  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
  }

  return res.data;
};

const getAllUsers = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const res = await axios.get(baseURL + "/api/users/get-users", config);
  return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { login, logout, register, getAllUsers };
export default authService;
