// import axios from "./CustomizeAxios";
import axios from "axios";
import { BASE_URL } from "../constant";
import instanceAxios from "./CustomizeAxios";
const instance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  baseURL: BASE_URL,
});

const baseAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: BASE_URL,
});

const createBlog = async (content) => {
  const response = await instanceAxios.post("/Blog/Create", content);
  return response.data;
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

const updateComment = (payload) => {
  return baseAxios.put(`/Comment/Update`, payload);
};
export { createBlog, uploadImage, uploadComment, getComment, deleteComment, updateComment };
