import useSWR from "swr";
import { getAllCategory } from "../services/ApiServices";
import { getAdvertisement } from "../services/RecipeServices";
import { getAds, getAdsStatus } from "../services/Advertisement";
export const useGetAdvertisementList = ({ id }) => {
  const { data, isLoading } = useSWR(
    "/api/Advertisement/GetAdvertismentById",
    () => getAdvertisement(id)
  );
  return { advertisementList: data?.data, isLoading };
};
export const useGetAdvertisement = () => {
  const { data, isLoading } = useSWR(
    "/api/Advertisement/GetAdvertismentActive",
    () => getAdsStatus()
  );
  return { advertisementList: data?.data, isLoading };
};
