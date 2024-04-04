import axios from "./CustomizeAxios";

const checkOut = (
  userId,
  recipeId,
  featuredImage,
  recipeTitle,
  recipePrice,
  voucherCode,
  discountPercentage
) => {
  return axios.post("/Payment/Checkout", {
    userId,
    recipeId,
    featuredImage,
    recipeTitle,
    recipePrice,
    voucherCode,
    discountPercentage,
  });
};
const getHistoryPayment = (id) => {
  return axios.get(`/Payment/History?id=${id}`);
};

export { checkOut, getHistoryPayment };
