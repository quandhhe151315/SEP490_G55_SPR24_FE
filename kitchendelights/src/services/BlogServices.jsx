// import axios from "./CustomizeAxios";
import axios from "axios";
import instanceAxios from "./CustomizeAxios";
const instance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
  baseURL: "http://localhost:5050/api",
});

const baseAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: "http://localhost:5050/api",
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
export { createBlog, uploadImage, uploadComment, getComment};
