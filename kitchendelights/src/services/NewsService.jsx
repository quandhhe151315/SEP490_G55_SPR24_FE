import axios from "./CustomizeAxios";

  const acceptNews = (id) => {
      return axios.patch(`/News/Accept?id=${id}`);
  }
  
  const deleteNews = (id) => {
      return axios.delete(`/News/Delete?id=${id}`);
  }

  const searchNews = (text) => {
    return axios.get(`/News/Search?search=${text}`);
  }
  
  export {
    acceptNews, deleteNews, searchNews
  };