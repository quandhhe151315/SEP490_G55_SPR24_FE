// {
//     searchName,
//     category,
//     country,
//     ingredient,
//     isfree,
//     orderby,
//     sort,
//   }
import useSWR from "swr";
import { getRecipeByFilter } from "../services/RecipeServices";
export const useGetRecipeByFilter = (params) => {
  const { data, isLoading,error } = useSWR(
    ["/Recipe/FilterRecipe", params?.country, params?.ingredient],
    () => getRecipeByFilter(params)
  );
  return { recipList: data?.data, isLoading, error };
};
