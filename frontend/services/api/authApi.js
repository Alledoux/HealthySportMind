import axios from "axios";
import { API_BASE_URL } from "../../config/api";

const API_URL = API_BASE_URL;

export const registerUser = async (data) => {
  return axios.post(`${API_URL}/auth/register/`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginUser = async (email, password) => {
  console.log("LOGIN URL:", `${API_URL}/auth/login/`);

  const res = await axios.post(`${API_URL}/auth/login/`, { email, password }, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return res.data;
};