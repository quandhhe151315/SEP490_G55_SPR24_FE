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

  const createIngredientMarketplace = (ingredientId, marketplaceId) => {
    return axios.post("/IngMarketplace/Create", { ingredientId,marketplaceId });
  }

  export {
    listMarketplace, listIngredientMarketplace, createMarketplace, createIngredient, createIngredientMarketplace
  };

  