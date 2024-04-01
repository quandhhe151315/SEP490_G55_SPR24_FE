import useSWR from "swr";
import { getAllIngredient } from "../services/RecipeServices";
export const useGetAllIngredient = () => {
  const { data, isLoading } = useSWR("/Country/GetAllCountry", () =>
    getAllIngredient()
  );
  return { allIngredient: data?.data, isLoading };
};
