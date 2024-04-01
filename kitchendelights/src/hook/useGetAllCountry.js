import useSWR from "swr";
import { getAllCountry } from "../services/RecipeServices";
export const useGetAllCountry = () => {
  const { data, isLoading } = useSWR("/api/Country/GetAllCountry", () =>
    getAllCountry()
  );
  return { allCountryList: data?.data, isLoading };
};
