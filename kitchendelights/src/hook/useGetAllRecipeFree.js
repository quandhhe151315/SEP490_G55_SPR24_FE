import useSWR from "swr";
import {
  getAllRecipeFree,
} from "../services/RecipeServices";
export const useGetAllRecipeFree = () => {
  const { data, isLoading } = useSWR(["/api/Recipe/GetAllRecipeFree"], () =>
    getAllRecipeFree()
  );
  return { allRecipeFree: data?.data, isLoading };
};
