import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ Logout, user }) => {
  const padding = {
    paddingRight: 5,
  };

  return (
    <div>
      <Link style={padding} to="/blogs">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <span style={padding}> {user.username} logged in</span>
      <button style={padding} onClick={() => Logout()}>
        logout
      </button>
    </div>
  );
};
export default Navigation;
