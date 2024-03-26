import useSWR from "swr";
import { getAllRecipeASCbyRating } from "../services/RecipeServices";
export const useGetAllRecipeASCbyRating = () => {
  const { data, isLoading } = useSWR(
    ["/api/Recipe/GetAllRecipeASCbyRating"],
    () => getAllRecipeASCbyRating()
  );
  return { allRecipeASCbyRating: data?.data, isLoading };
};
