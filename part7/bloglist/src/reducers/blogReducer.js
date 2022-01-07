import APIBlogs from "../services/blogs";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "INITIAL_BLOG":
      return action.blogs;
    case "CREATE_BLOG":
      return [...state, action.blog];
    case "LIKE_BLOG": {
      const updatedBlog = state.find((b) => b.id === action.blog.id);
      const blogs = state.filter((b) => b.id !== action.blog.id);
      return [...blogs, updatedBlog];
    }
    case "DELETE_BLOG":
      return state;
    case "SET_TOKEN":
      return state;
    default:
      return state;
  }
};

export const initialBlog = () => async (dispatch) => {
  const blogs = await APIBlogs.getAll();
  dispatch({
    type: "INITIAL_BLOG",
    blogs,
  });
};

export const createBlog = (blogObject) => async (dispatch) => {
  const blog = await APIBlogs.createBlog(blogObject);
  dispatch({
    type: "CREATE_BLOG",
    blog,
  });
};

export const likeBlog = (blogObject, id) => async (dispatch) => {
  blogObject.likes++;
  const blog = await APIBlogs.updateBlog(blogObject, id);
  dispatch({
    type: "LIKE_BLOG",
    blog,
    id,
  });
};

export const deleteBlog = (id) => async (dispatch) => {
  await APIBlogs.deleteBlog(id);
  dispatch({
    type: "DELETE_BLOG",
  });
};

export const setToken = (token) => async (dispatch) => {
  await APIBlogs.setToken(token);
  dispatch({
    type: "SET_TOKEN",
  });
};

export default reducer;
