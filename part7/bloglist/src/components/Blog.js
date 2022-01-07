import React from "react";

const Blog = ({ blog, incLike, deleteBlog }) => {
  const handleDeleteBlog = (id) => {
    deleteBlog(id);
  };

  const updateBlog = (blog) => {
    incLike(blog);
  };

  return (
    <div>
      <h1>
        <span className="title">{blog.title} </span>
        <span className="author">{blog.author}</span>
      </h1>

      <div>
        <a className="url" href={blog.url} style={{ display: "block" }}>
          {blog.url}
        </a>
        <span className="likes">{blog.likes} likes</span>
        <button onClick={() => updateBlog(blog)}>like</button>
        <div>
          added by {blog.user ? blog.user.username : <span>no username</span>}{" "}
          {blog.user ? blog.user.name : <span>no name</span>}
        </div>
        <button onClick={() => handleDeleteBlog(blog.id)}>remove</button>
      </div>
    </div>
  );
};

export default Blog;
