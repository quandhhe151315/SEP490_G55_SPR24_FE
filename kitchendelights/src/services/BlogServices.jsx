// import axios from "./CustomizeAxios";
import axios from "axios";
import { BASE_URL } from "../constant";
import instanceAxios from "./CustomizeAxios";
import Cookies from "js-cookie";

const token = Cookies.get("jwt");

const instance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${token}`,
  },
  baseURL: BASE_URL,
});

const baseAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  baseURL: BASE_URL,
});

const createBlog = async (content) => {
  const response = await instanceAxios.post("/Blog/Create", content);
  return response.data;
};
const updateBlog = async (content) => {
  const response = await instanceAxios.put("/Blog/Update", content);
  return response;
};

const uploadImage = async (formData, type) => {
  const response = await instance.post(`/Upload/Image?type=${type}`, {
    image: formData,
  });
  return response.data;
};

const uploadComment = (content) => {
  return baseAxios.post("/Comment/Create", content);
};

const getComment = (id) => {
  return baseAxios.get("/Comment/Get", { params: { id } });
};

const deleteComment = (id) => {
  return baseAxios.delete(`/Comment/Delete?id=${id}`);
};
const deleteBlog = (id) => {
  return baseAxios.delete(`/Blog/Delete?id=${id}`);
};
const updateComment = (payload) => {
  return baseAxios.put(`/Comment/Update`, payload);
};
const updateBlogByStatus = (params) => {
  return baseAxios.patch(
    `/Blog/Status?id=${params?.id}&status=${params?.status}`
  );
};

export {
  updateBlogByStatus,
  createBlog,
  uploadImage,
  deleteBlog,
  uploadComment,
  getComment,
  deleteComment,
  updateComment,
  updateBlog,
};
