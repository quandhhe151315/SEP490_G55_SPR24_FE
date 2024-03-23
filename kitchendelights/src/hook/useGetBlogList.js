import useSWR from "swr";
import { getBlogList } from "../services/ApiServices";
export const useGetBlogList = (params) => {
  const { data, isLoading } = useSWR(
    ["/api/Blog/Get", params?.category, params?.sort, params?.id, params?.search],
    () => getBlogList(params)
  );
  return { blogList: data?.data, isLoading };
};
