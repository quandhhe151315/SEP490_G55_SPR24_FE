import axios from "./CustomizeAxios";

export const getAllRecipeASCbyRating = () => {
  return axios.post("/api/Recipe/GetAllRecipeASCbyRating");
};

export const getAllRecipeFree = () => {
  return axios.post("/api/Recipe/GetAllRecipeFree");
};
export const getAllRecipePaid = () => {
  return axios.post("/api/Recipe/GetAllRecipePaid");
};
