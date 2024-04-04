import useSWR from "swr";
import { getAllRecipebyRating } from "../services/RecipeServices";

export const useGetAllRecipebyRating = (params) => {
  const { data, isLoading } = useSWR(
    ["/api/Recipe/HighRating",
    params?.count],
   
    () => getAllRecipebyRating(params)
  );
  return { allRecipebyRating: data?.data, isLoading };
};
