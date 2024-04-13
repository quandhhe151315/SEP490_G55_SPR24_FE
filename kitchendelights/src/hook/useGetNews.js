import useSWR from "swr";
import {listNews } from "../services/ApiServices";
export const useGetNews = () => {
  const { data, isLoading } = useSWR("/api//News/Get", () => listNews());
  return { newsList: data?.data, isLoading };
};
