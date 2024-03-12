import useSWR from "swr";
import { getComment } from "../services/BlogServices";
export const useGetComment = (id) => {
  const { data, isLoading } = useSWR("/api/Comment/Get", () => getComment(id));
  return { commentList: data?.data, isLoading };
};
