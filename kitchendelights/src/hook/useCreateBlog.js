import useSWR from "swr";
import { createBlog } from "../services/BlogServices";
export const useCreateBlog = (blogContent) => {
  const { data, isLoading } = useSWR("/api/Blog/Create", () => createBlog(blogContent));
  return { createdBlog: data?.data, isLoading };
};
