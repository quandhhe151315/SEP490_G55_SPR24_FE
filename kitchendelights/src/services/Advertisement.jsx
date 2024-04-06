import axios from "./CustomizeAxios";

const getAds = () => {
  return axios.get("/Advertisement/GetAdvertismentById");
};
const createAds = (advertisementImage, advertisementLink) => {
  return axios.post("/Advertisement/Create", {
    advertisementImage,
    advertisementLink,
  });
};
const updateAds = (advertisementId, advertisementImage, advertisementLink) => {
  return axios.put("/Advertisement/Update", {
    advertisementId,
    advertisementImage,
    advertisementLink,
  });
};
const deleteAds = (id) => {
  return axios.delete(`/Advertisement/Delete?id=${id}`);
};
export { getAds, createAds, updateAds, deleteAds };
