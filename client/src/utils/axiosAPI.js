import axios from "axios";


export const coursesApi = axios.create({
  baseURL: env.REACT_APP_COURSES_API
});


export const mockApi = axios.create({
  baseURL: env.REACT_APP_MOCK_API
});