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

const createNews = (userId, newsTitle, newsContent, featuredImage) => {
  return axios.post("/News/Create", {
    userId,
    newsTitle,
    newsContent,
    featuredImage,
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
// Cart
const addToCart = (userId, recipeId) => {
  return axios.post("Cart/Add", {
    userId,
    recipeId,
  });
};

const removeCart = (userId, recipeId) => {
  return axios.delete("Cart/Remove", {
    data: {
      userId: userId,
      recipeId: recipeId,
    },
  });
};
const getListCart = (id) => {
  return axios.get(`/Cart/Get?id=${id}`);
};

//Voucher
const getAllVoucherByUserId = (userId) => {
  return axios.get(`Voucher/GetAllvouchers?userId=${userId}`);
};
const deleteVoucher = (voucherCode) => {
  return axios.delete(`/Voucher/DeleteVoucher?voucherCode=${voucherCode}`);
};
const createVoucher = (id) => {
  return axios.post(`/Voucher/CreateVoucher?id=${id}`);
};

const addVoucher = (id, discountCode) => {
  return axios.put(`/Cart/Discount?id=${id}&discountCode=${discountCode}`);
};
const checkInteraction = (id, type) => {
  return axios.patch(`/User/Interact?id=${id}&type=${type}`);
};
//Payment
const getHistoryPayment = (id) => {
  return axios.get(`/Payment/History?id=${id}`);
};
const checkOut = () => {};

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

const UpdateReview = (ratingId, recipeId, ratingValue, ratingContent) => {
  return axios.put("/Review/Update", {
    ratingId,
    recipeId,
    ratingValue,
    ratingContent,
  });
};

const RemoveReview = (recipeId, ratingId) => {
  return axios.delete(
    `/Review/Delete?recipeId=${recipeId}&ratingId=${ratingId}`
  );
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
const getRecipeById = (id) => {
  return axios.get(`/Recipe/GetRecipeById?recipeId=${id}`);
};
const getRecipeByUserId = (id) => {
  return axios.get(`/Recipe/GetAllRecipeByUserId?userId=${id}`);
};
const deleteRecipe = (id) => {
  return axios.delete(`/Recipe/DeleteRecipe?recipeId=${id}`);
};
const getAllCategory = () => {
  return axios.get("/Category/GetAllCategoy?categoryType=1");
};

const deleteCategory = (id) => {
  return axios.delete(`Category/DeleteCategory?categoryId=${id}`);
};

const getCategoryById = (id) => {
  return axios.get(`/Category/GetCategoryById?categoryId=${id}`);
};

const checkUserRecipe = (id) => {
  return axios.get(`/Recipe/CheckUserOwnRecipePaid?userId=${id}`);
};

const getRecipeBought = (userId) => {
  return axios.get(`/Recipe/GetRecipeUserBought?userId=${userId}`);
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

const updateCategory = (categoryId, categoryName, categoryType, parentId) => {
  return axios.put("/Category/UpdateCategory", {
    categoryId,
    categoryName,
    categoryType,
    parentId,
  });
};

const getCategoryByParentId = () => {
  return axios.get("/Category/GetCategoryByParentId?categoryType=true");
};

const listUsers = (id) => {
  return axios.get(`/User/List?id=${id}`);
};

const getBlogList = (params) => {
  return axios.get(`/Blog/Get`, { params: params });
};

const getBlogDetail = (id) => {
  return axios.get(`/Blog/Get?id=${id}`);
};
const createBlog = (content) => {
  return axios.post(`/Blog/Create`, content);
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
const updateCategoryRecipe = (recipeId, categoryId, type) => {
  return axios.put(
    `/Recipe/UpdateCategoryRecipe?recipeId=${recipeId}&categoryId=${categoryId}&type=${type}`
  );
};

const updateStatusRecipe = (recipeId, status) => {
  return axios.put(
    `Recipe/UpdateStatusRecipe?recipeId=${recipeId}&status=${status}`
  );
};

const getNumberRevenueInThisMonth = () => {
  return axios.get("/Payment/GetNumberRevenueInThisMonth");
};

const getNumberRevenueInFiveMonth = () => {
  return axios.get("/Payment/GetNumberRevenueInNumberMonth?numMonth=5");
};

const getNumberUserCreatedInThisMonth = () => {
  return axios.get("/User/GetNumberUserCreatedInThisMonth");
};

const getNumberRecipeCreatedInThisMonth = () => {
  return axios.get("/Recipe/GetNumberRecipeCreatedInThisMonth");
};
const getNumberOfRecipesAreBoughtInThisMonth = () => {
  return axios.get("/Payment/GetNumberOfRecipesAreBoughtInThisMonth");
};
const getNumberOfUserEachRole = () => {
  return axios.get("/User/GetNumberOfUserEachRole");
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
  getRecipeById,
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
  addToCart,
  removeCart,
  getListCart,
  updateStatusRecipe,
  updateCategory,
  getAllVoucherByUserId,
  deleteVoucher,
  createVoucher,
  getHistoryPayment,
  addVoucher,
  updateCategoryRecipe,
  getNumberRevenueInThisMonth,
  getNumberRevenueInFiveMonth,
  getNumberUserCreatedInThisMonth,
  getNumberRecipeCreatedInThisMonth,
  checkInteraction,
  getRecipeByUserId,
  checkUserRecipe,
  getRecipeBought,
  UpdateReview,
  RemoveReview,
  getNumberOfRecipesAreBoughtInThisMonth,
  getNumberOfUserEachRole,
};
