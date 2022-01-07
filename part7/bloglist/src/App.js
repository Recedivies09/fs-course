import React, { useState, useEffect } from "react";
// Component
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import Navigation from "./components/Navigation";
import Users from "./components/Users";
import User from "./components/User";
// Redux
import { setNotification } from "./reducers/notificationReducer";
import {
  createBlog,
  initialBlog,
  likeBlog,
  deleteBlog,
  setToken,
} from "./reducers/blogReducer";
import { login, getUser } from "./reducers/loginReducer";
import { getAllUser } from "./reducers/userReducer";
import { connect } from "react-redux";

import { Route, Switch, useRouteMatch } from "react-router-dom";

const App = (props) => {
  const blogs = props.blogs;
  const user = props.user;
  const users = props.users;

  useEffect(async () => {
    await props.getAllUser();
    await props.getUser();
  }, []);

  useEffect(async () => {
    if (user) {
      await props.setToken(user.token);
      await props.initialBlog();
    }
  }, [user]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await props.login(username, password);
      if (user) await props.setToken(user.token);

      setUsername("");
      setPassword("");
      await props.setNotification("Logged in", 5, true);
    } catch (err) {
      await props.setNotification("wrong username or password", 5, false);
    }
  };

  const handleLogout = async () => {
    await window.localStorage.removeItem("loggedinUser");
  };

  const handleCreateBlog = async (blogObject) => {
    try {
      await props.createBlog(blogObject);
      await props.setNotification(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        5,
        true
      );
    } catch (err) {
      await props.setNotification("title and url field is required", 5, false);
    }
  };

  const handleLike = async (blogObject) => {
    await props.likeBlog(blogObject, blogObject.id);
  };

  const handleDeleteBlog = async (id) => {
    await props.deleteBlog(id);
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog">
        <BlogForm createBlog={handleCreateBlog} />
      </Togglable>
    );
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <Notification />
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );
  };

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        {loginForm()}
      </div>
    );
  }

  const match_users = useRouteMatch("/users/:id");
  const match_blogs = useRouteMatch("/blogs/:id");
  const blogs_link = match_blogs
    ? blogs.find((b) => b.id === match_blogs.params.id)
    : null;
  const user_link = match_users
    ? users.find((u) => u.id === match_users.params.id)
    : null;

  return (
    <div>
      <Navigation Logout={handleLogout} user={user} />

      <Notification />

      <Switch>
        <Route path="/users/:id">
          <User user={user_link} />
        </Route>

        <Route path="/users">
          <Users users={users} />
        </Route>

        <Route path="/blogs/:id">
          <Blog
            blog={blogs_link}
            incLike={handleLike}
            deleteBlog={handleDeleteBlog}
          />
        </Route>

        <Route path="/blogs">
          <h1>blogs</h1>
          {blogForm()}
          <Blogs blogs={blogs} />
        </Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => {
  const users = state.users;
  const user = state.user;
  let blogs = state.blogs,
    ret = [];
  blogs.sort((a, b) => b.likes - a.likes);
  blogs.forEach((blog) => {
    if (user && blog.user.username === user.username) {
      ret = [...ret, blog];
    }
  });
  blogs = ret;
  return { blogs, user, users };
};

export default connect(mapStateToProps, {
  setNotification,
  createBlog,
  initialBlog,
  likeBlog,
  deleteBlog,
  setToken,
  getAllUser,
  login,
  getUser,
})(App);
