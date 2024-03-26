import axios from "./CustomizeAxios";

export const getAllRecipeASCbyRating = () => {
  return axios.get("/Recipe/GetAllRecipeASCbyRating");
};

export const getAllRecipeFree = () => {
  return axios.get("/Recipe/GetAllRecipeFree");
};
export const getAllRecipePaid = () => {
  return axios.get("/Recipe/GetAllRecipePaid");
};
