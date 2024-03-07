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

const createNews = (userId, userName, newsTitle, newsContent) => {
  return axios.post("/News/Create", {
    userId,
    userName,
    newsTitle,
    newsContent,
  });
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
const getRecipes = ()=>{
    return axios.get('/Recipe/GetAllRecipe');
}
 const getRecipessById = (id)=>{
    return axios.get(`/Recipe/GetRecipeById?recipeId=${id}`);
 }
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
  listUsers,getRecipes,getRecipessById
};
