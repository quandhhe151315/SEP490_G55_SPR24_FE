import axios from "./CustomizeAxios";

export const getAllRecipebyRating = (params) => {
  return axios.get("/Recipe/HighRating",{params});
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

export const getRecipeByFilter = (params) => {
  return axios.get("/Recipe/GetAllRecipe", { params });
};
export const getAllCategory = () => {
  return axios.get("/Category/GetAllCategoy");
};

export const getCategoryByParentId = (parentId) => {
  const url = parentId
    ? `/Category/GetCategoryByParentId?parentId=${parentId}`
    : "/Category/GetCategoryByParentId";
  return axios.get(url);
};
