import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.get(baseUrl, config);
  return request.then((response) => response.data);
};

const createBlog = (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const updateBlog = (blog, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.put(`${baseUrl}/${id}`, blog, config);
  return request.then((response) => response.data);
};

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${id}`, config);
  return request
    .then((response) => response.data)
    .catch((err) => console.log(err));
};

const APIBlogs = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};

export default APIBlogs;
