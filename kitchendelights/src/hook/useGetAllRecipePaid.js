import useSWR from "swr";
import { getAllRecipePaid } from "../services/RecipeServices";
export const useGetAllRecipePaid = () => {
  const { data, isLoading } = useSWR(["/api/Recipe/GetAllRecipePaid"], () =>
    getAllRecipePaid()
  );
  return { allRecipePaid: data?.data, isLoading };
};
