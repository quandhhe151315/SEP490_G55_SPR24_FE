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
export const getAllCountry = () => {
  return axios.get("/Country/GetAllCountry");
};

export const getAllIngredient = () => {
  return axios.get("/Ingredient/GetAllIngredient");
};

export const searchRecipe = (searchName) => {
  return axios.get(`/Recipe/GetAllRecipe?searchName=${searchName}`);
};
