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
  const { data, isLoading, error } = useSWR(
    [
      "/Recipe/GetAllRecipe",
      params?.searchName,
      params?.name,
      params?.country,
      params?.ingredient,
      params?.category,
      params?.isfree,
      params?.orderby,
      params?.sort
    ],
    () => getRecipeByFilter(params)
  );
  return { recipList: data?.data, isLoading, error };
};
