import axios from "axios";

const createBlog = async (content) => {
    const response = await axios.post('/Blog/Create', { content });
    return response.data;
};
export {createBlog};