import axios from "axios";

const USER_TOKEN = window.localStorage.getItem("access_token")
const AuthStr = `Bearer ${USER_TOKEN}`;
const baseUrl = `${window.location.origin}/`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Authorization': AuthStr,
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  // timeout: 8000
});

window.api = axiosInstance;
export const api = axiosInstance;
