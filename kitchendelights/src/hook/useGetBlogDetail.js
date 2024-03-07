import useSWR from "swr";
import { getBlogDetail, getBlogList } from "../services/ApiServices";
export const useGetBlogDetail = (id) => {
  const { data, isLoading } = useSWR(`/api/Blog/Get/${id}`, () =>
    getBlogDetail(id)
  );
  return { blogDetail: data?.data, isLoading };
};
