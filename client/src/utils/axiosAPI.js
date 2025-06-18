import axios from "axios";

export const coursesApi = axios.create({
  baseURL: "https://api.jsonbin.io/v3/b/6851b3108561e97a5025fe00",
});


export const mockApi = axios.create({
  baseURL: "https://68517eaf8612b47a2c0a4ef6.mockapi.io/coursecat/api",
});