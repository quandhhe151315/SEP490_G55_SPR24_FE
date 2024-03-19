import axios from "./CustomizeAxios";

const login = (email, password) => {
  return axios.post("/User/Login", { email, password });
};

const register = (username, email, password) => {
  return axios.post("/User/Register", { username, email, password });
};

const changePassword = (userId, oldPassword, password) => {
  return axios.patch("/User/ChangePassword", { userId, oldPassword, password });
};

const createNews = (userId, newsTitle, newsContent) => {
  return axios.post("/News/Create", { userId, newsTitle, newsContent });
};

const listNews = () => {
  return axios.get("/News/Get");
};

const getNewsById = (id) => {
  return axios.get(`/News/Get?id=${id}`);
};

const myProfile = (id) => {
  return axios.get(`/User/Profile?id=${id}`);
};

// Bookmark

const addRecipeToBookMark = (uId, rId, type) => {
  return axios.put(
    `/Bookmark/ModifyRecipeInBookMark?userId=${uId}&recipeId=${rId}&type=${type}`
  );
};
const getBookMarkOfUser = (id) => {
  return axios.get(`/Bookmark/GetBookmarkOfUser?Id=${id}`);
};
const removeRecipeFromBookMark = (uId, rId, type) => {
  return axios.put(
    `/Bookmark/ModifyRecipeInBookMark?userId=${uId}&recipeId=${rId}&type=${type}`
  );
};
// Bookmark

// comment rating:
const CreateReview = (recipeId, userId, ratingValue, ratingContent) => {
  return axios.post("Review/Create", {
    recipeId,
    userId,
    ratingValue,
    ratingContent,
  });
};
const GetReviewByRecipeId = (id) => {
  return axios.get(`/Review/Get?id=${id}`);
};
// comment rating

const changeMyProfile = (
  userId,
  email,
  firstName,
  middleName,
  lastName,
  phone,
  addresses,
  avatar,
  statusUser,
  role
) => {
  return axios.put("/User/UpdateProfile", {
    userId,
    email,
    firstName,
    middleName,
    lastName,
    phone,
    addresses,
    avatar,
    status: statusUser,
    role,
  });
};

const listAllCountry = () => {
  return axios.get("/Country/GetAllCountry");
};

// repice
const createRecipe = (
  userId,
  featuredImage,
  recipeDescription,
  videoLink,
  recipeTitle,
  preparationTime,
  cookTime,
  recipeServe,
  recipeContent,
  isFree,
  recipePrice,
  countryId,
  recipeIngredients
) => {
  return axios.post("/Recipe/CreateRecipe", {
    userId,
    featuredImage,
    recipeDescription,
    videoLink,
    recipeTitle,
    preparationTime,
    cookTime,
    recipeServe,
    recipeContent,
    isFree,
    recipePrice,
    countryId,
    recipeIngredients,
  });
};
const getRecipes = () => {
  return axios.get("/Recipe/GetAllRecipe");
};
const getRecipessById = (id) => {
  return axios.get(`/Recipe/GetRecipeById?recipeId=${id}`);
};
const deleteRecipe = (id) => {
  return axios.delete(`/Recipe/DeleteRecipe?recipeId=${id}`);
};
const getAllCategory = () => {
  return axios.get("/Category/GetAllCategoy");
};

const deleteCategory = (id) => {
  return axios.delete(`Category/DeleteCategory?categoryId=${id}`);
};

const getCategoryById = (id) => {
  return axios.get(`/Category/GetCategoryById?categoryId=${id}`);
};

const postCreateCategory = (
  categoryId,
  categoryName,
  categoryType,
  parentId
) => {
  return axios.post("/Category/CreateCategory", {
    categoryId,
    categoryName,
    categoryType,
    parentId,
  });
};

const getCategoryByParentId = () => {
  return axios.get("/Category/GetCategoryByParentId");
};

const listUsers = () => {
  return axios.get("/User/List");
};

const getBlogList = () => {
  return axios.get(`/Blog/Get`);
};

const getBlogDetail = (id) => {
  return axios.get(`/Blog/Get?id=${id}`);
};
const createBlog = () => {
  return axios.post(`/Blog/Create`);
};

//menu API

const getMenus = (id) => {
  return axios.get(`/Menu/GetMenuByUserId?userId=${id}`);
};
const createMenu = (
  userId,
  menuName,
  featuredImage = null,
  menuDescription = null
) => {
  return axios.post("/Menu/CreateMenu", {
    featuredImage,
    menuName,
    menuDescription,
    userId,
  });
};
const addRecipeToMenu = (menuId, recipeId) => {
  return axios.put(
    `/Menu/AddRecipeToMenu?menuId=${menuId}&recipeId=${recipeId}`
  );
};
const removeRecipeFromMenu = (menuId, recipeId) => {
  return axios.put(
    `/Menu/RemoveRecipeFromMenu?menuId=${menuId}&recipeId=${recipeId}`
  );
};
const getMenuById = (menuId) => {
  return axios.get(`/Menu/GetMenuById?menuId=${menuId}`);
};
const deleteMenu = (menuId) => {
  return axios.delete(`Menu/DeleteMenu?menuId=${menuId}`);
};

const listAllIngredient = () => {
  return axios.get("/Ingredient/GetAllIngredient");
};
const getMenuByUserIdAndCheckExistRecipe = (userId, recipeId) => {
  return axios.get(
    `/Menu/GetMenuByUserIdAndCheckExistRecipe?userId=${userId}&recipeId=${recipeId}`
  );
};
const updateMenu = (
  menuId,
  menuName,
  menuDescription,
  featuredImage = null,
  userId = 0
) => {
  return axios.put(`/Menu/UpdateMenu`, {
    menuId,
    featuredImage,
    menuName,
    menuDescription,
    userId,
  });
};

export {
  login,
  register,
  changePassword,
  createNews,
  listNews,
  getNewsById,
  myProfile,
  changeMyProfile,
  getAllCategory,
  deleteCategory,
  getCategoryById,
  postCreateCategory,
  getCategoryByParentId,
  getRecipes,
  getRecipessById,
  deleteRecipe,
  listUsers,
  getBlogList,
  getBlogDetail,
  createBlog,
  getMenus,
  createMenu,
  addRecipeToBookMark,
  getBookMarkOfUser,
  removeRecipeFromBookMark,
  listAllIngredient,
  CreateReview,
  GetReviewByRecipeId,
  addRecipeToMenu,
  removeRecipeFromMenu,
  getMenuById,
  deleteMenu,
  getMenuByUserIdAndCheckExistRecipe,
  updateMenu,
  createRecipe,
  listAllCountry,
};
