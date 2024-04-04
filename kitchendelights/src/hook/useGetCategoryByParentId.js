import useSWR from "swr";
import { getCategoryByParentId } from "../services/RecipeServices";
export const useGetCategoryByParentId = (parentId) => {
  const { data, isLoading } = useSWR(
    ["/api/Category/getAllCategoryByParentId", parentId],
    () => getCategoryByParentId(parentId)
  );
  return { categoryByParentId: data?.data, isLoading };
};
