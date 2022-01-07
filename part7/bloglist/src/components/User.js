import React from "react";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  return (
    <div>
      <h1>{user.username}</h1>
      <h2>added blogs</h2>
      {user.blogs.length === 0 ? (
        <div>Empty</div>
      ) : (
        user.blogs.map((blog) => {
          return (
            <ul key={blog.id}>
              <li>{blog.title}</li>
            </ul>
          );
        })
      )}
      <Link to={"/users/:id"}></Link>
    </div>
  );
};

export default User;
