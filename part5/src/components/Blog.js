import React, { useState } from "react";

const Blog = ({ blog, incLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleDeleteBlog = (id) => {
    deleteBlog(id);
  };

  const updateBlog = (blog) => {
    incLike(blog);
  };

  return (
    <div style={blogStyle}>
      <div>
        <span className="title">{blog.title}</span>
        <span className="author">{blog.author}</span>
        <button onClick={() => setVisible(!visible)}>
          {!visible ? "view" : "hide"}
        </button>
      </div>

      <div style={showWhenVisible}>
        <div className="url">{blog.url}</div>
        <span className="likes">{blog.likes}</span>
        <button onClick={() => updateBlog(blog)}>like</button>
        <div>
          {blog.user ? blog.user.username : <span>no username</span>}{" "}
          {blog.user ? blog.user.name : <span>no name</span>}
        </div>
        <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
