import useSWR from "swr";
import { getAllCategory } from "../services/ApiServices";
import { getAdvertisement } from "../services/RecipeServices";
export const useGetAdvertisementList = ({ id }) => {
  const { data, isLoading } = useSWR(
    "/api/Advertisement/GetAdvertismentById",
    () => getAdvertisement(id)
  );
  return { advertisementList: data?.data, isLoading };
};
