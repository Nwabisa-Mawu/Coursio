import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "./axiosAPI";

export const getCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await coursesApi.get("/");
      return res.data.record; 
    },
  });
};