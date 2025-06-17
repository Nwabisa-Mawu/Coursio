import axios from "axios";


export const coursesApi = axios.create({
  baseURL: "****",
});


export const mockApi = axios.create({
  baseURL: "***",
});