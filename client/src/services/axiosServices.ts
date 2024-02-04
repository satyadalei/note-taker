import axios from "axios";

const apiKey = import.meta.env.VITE_BASE_API_URL
const authToken = localStorage.getItem("authToken");

const apiInstance1 = axios.create({
  baseURL : apiKey,
  headers : {
    "Content-Type" : "application/json",
    "Authorization" : `Bearer ${authToken}`
  }
})


export default apiInstance1