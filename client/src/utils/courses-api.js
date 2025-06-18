import { useQuery } from "@tanstack/react-query";
import { coursesApi } from "./axiosAPI";

export const getCourses = () => {
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = await coursesApi.get("/");
      localStorage.setItem("course", JSON.stringify(res.data.record));
      return res.data.record; 
    },
  });
};