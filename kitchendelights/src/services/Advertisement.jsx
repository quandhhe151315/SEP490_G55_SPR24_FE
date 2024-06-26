import axios from "./CustomizeAxios";

const getAds = () => {
  return axios.get("/Advertisement/GetAdvertismentById");
};
const getAdsId = (id) => {
  return axios.get(`/Advertisement/GetAdvertismentById?id=${id}`);
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
const changeStatus = (id, status) => {
  return axios.put(
    `/Advertisement/UpdateAdvertisementStatus?id=${id}&status=${status}`
  );
};
const deleteAds = (id) => {
  return axios.delete(`/Advertisement/Delete?id=${id}`);
};

const getAdsStatus = () => {
  return axios.get("/Advertisement/GetAdvertismentActive");
};
export {
  getAds,
  createAds,
  updateAds,
  deleteAds,
  changeStatus,
  getAdsStatus,
  getAdsId,
};
