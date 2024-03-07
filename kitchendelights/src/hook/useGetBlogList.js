import useSWR from "swr";
import { getBlogList } from "../services/ApiServices";
export const useGetBlogList = () => {
  const { data, isLoading } = useSWR("/api/Blog/Get", () => getBlogList());
  return { blogList: data?.data, isLoading };
};
