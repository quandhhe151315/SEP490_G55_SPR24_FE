import axios from "./CustomizeAxios";

const checkOut = (cart) => {
  return axios.post("/Payment/Checkout", cart);
};
const getHistoryPayment = (id) => {
  return axios.get(`/Payment/History?id=${id}`);
};

const getURL = (amount) => {
  return axios.get(`/Cart/returnURLPayment?amount=${amount}`);
};

export { checkOut, getHistoryPayment, getURL };
