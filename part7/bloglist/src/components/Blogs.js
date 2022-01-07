import React from "react";
import { Link } from "react-router-dom";

const Blogs = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id} style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              <div>
                {blog.title} {blog.author}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
