import useSWR from "swr";
import { getCategoryByParentId } from "../services/RecipeServices";
export const useGetCategoryByParentId = (params) => {
  const { data, isLoading } = useSWR(
    ["/api/Category/getAllCategoryByParentId",
    params?.parentId,
    params?.categoryType],
    () => getCategoryByParentId(params)
  );
  return { categoryByParentId: data?.data, isLoading };
};
