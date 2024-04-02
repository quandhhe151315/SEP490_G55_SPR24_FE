import axios from "./CustomizeAxios";
  const listMarketplace = () => {
    return axios.get("/Marketplace/Get");
  };

  const listIngredientMarketplace = () => {
    return axios.get("/IngMarketplace/Get");
  };

  const createMarketplace = (marketplaceName,marketplaceLogo) => {
    return axios.post("/Marketplace/Create", { marketplaceName,marketplaceLogo });
  }
 
  const createIngredient = (ingredientName, ingredientUnit) => {
    return axios.post("/Ingredient/Create", { ingredientName,ingredientUnit });
  }

  const createIngredientMarketplace = (ingredientId, marketplaceId, marketplaceLink) => {
    return axios.post("/IngMarketplace/Create", { ingredientId, marketplaceId, marketplaceLink });
  }

  const getListIngredientMarketplaceById = (id) => {
    return axios.get(`/IngMarketplace/Get?id=${id}`);
  }

  const changeStatusMarketplace = (id) => {
    return axios.patch(`/Marketplace/Status?id=${id}`);
  }

  const deleteMarketplaceLink = (ingredientId, marketplaceId) => {
    return axios.delete(`/IngMarketplace/Delete?ingredientId=${ingredientId}&marketplaceId=${marketplaceId}`);
  }
  
  export {
    listMarketplace, listIngredientMarketplace, createMarketplace, createIngredient, createIngredientMarketplace, getListIngredientMarketplaceById, changeStatusMarketplace, deleteMarketplaceLink
  };

  