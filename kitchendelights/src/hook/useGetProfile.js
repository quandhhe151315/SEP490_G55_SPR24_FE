import useSWR from "swr";
import { myProfile } from "../services/ApiServices";
export const useGetProfile = (id) => {
  const { data, isLoading } = useSWR(["/api/get/Profile", id], () =>
    myProfile(id)
  );
  return { profile: data?.data, isLoading };
};
