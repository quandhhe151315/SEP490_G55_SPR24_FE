import useSWR from "swr";
import { getAllCategory } from "../services/ApiServices";
export const useGetAllCategory = () => {
  const { data, isLoading } = useSWR("/api/Category/GetAllCategoy", () => getAllCategory());
  return { categoriesList: data?.data, isLoading };
};
