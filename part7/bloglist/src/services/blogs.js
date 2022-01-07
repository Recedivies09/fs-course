import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = async (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.get(baseUrl, config);
  return request.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.post(baseUrl, blog, config);
  return request.data;
};

const updateBlog = async (blog, id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.put(`${baseUrl}/${id}`, blog, config);
  return request.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = await axios.delete(`${baseUrl}/${id}`, config);
  return request.data;
};

const APIBlogs = {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
  setToken,
};

export default APIBlogs;
