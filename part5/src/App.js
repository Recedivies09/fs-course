import React, { useState, useEffect } from "react";
// Component
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/Login";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
// API
import APIBlogs from "./services/blogs";
import APIUsers from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedinUser = window.localStorage.getItem("loggedinUser");

    if (loggedinUser) {
      const user = JSON.parse(loggedinUser);
      setUser(user);
      APIBlogs.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    APIBlogs.getAll().then((blogs) => {
      blogs.sort((a, b) => b.likes - a.likes);
      blogs.forEach((blog) => {
        if (user) {
          if (blog.user.username === user.username)
            setBlogs((blogs) => [...blogs, blog]);
        }
      });
    });
  }, [user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await APIUsers.login({ username, password });

      window.localStorage.setItem("loggedinUser", JSON.stringify(user));

      APIBlogs.setToken(user.token);

      setUser(user);
      setUsername("");
      setPassword("");
    } catch (err) {
      console.log(err);
      setErrorMessage(err);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedinUser");
  };

  const handleCreateBlog = (blogObject) => {
    APIBlogs.createBlog(blogObject);
    setSuccessMessage("new blog has been added");
    // setSuccessMessage(`a new blog ${title} by ${author} added`);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 5000);
  };

  const handleLike = (blogObject) => {
    const updatedBlog = blogs.find((b) => b.id === blogObject.id);
    const id = blogObject.id;
    if (updatedBlog) {
      updatedBlog.likes++;
      APIBlogs.updateBlog(updatedBlog, id)
        .then(() =>
          setBlogs(blogs.map((blog) => (blog.id !== id ? blog : updatedBlog)))
        )
        .catch((err) => {
          setErrorMessage(err);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  const handleDeleteBlog = (id) => {
    APIBlogs.deleteBlog(id).catch((err) => {
      setErrorMessage(err);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    });
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

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <h1>blogs</h1>

      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />

      <p>
        <span>{user.username} logged in</span>
        <button onClick={() => handleLogout()}>logout</button>
      </p>

      <h1>create new</h1>

      {blogForm()}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          incLike={handleLike}
          deleteBlog={handleDeleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
