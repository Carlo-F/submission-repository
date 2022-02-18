import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { createMessage, removeMessage } from './reducers/notificationReducer';
import { setBlogs, createBlog, deleteBlog } from './reducers/blogReducer';

let timeoutID;

const App = () => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  const blogs = useSelector(state => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
        .then(blogs => dispatch(setBlogs(blogs)))
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(createMessage('Wrong username or password'));
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        dispatch(removeMessage());
      }, 2000);
    }
  };

  const handleLogout = async (event) => {
    event.preventDefault();

    setUser(null);
    window.localStorage.removeItem("loggedBlogappUser");
  };

  const addLike = async (blogObject) => {
    await blogService.update(blogObject, blogObject.id);
    dispatch(createMessage('Blog liked!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage());
    }, 2000);
  };

  const addBlog = async (blogObject) => {
    const newBlog = await blogService.create(blogObject);

    dispatch(createBlog(newBlog));
    dispatch(createMessage('new blog added!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  const removeBlog = async (blogId) => {
    //await blogService.deleteBlog(blogId);

    // const blogs = await blogService.getAll();
    // setBlogs(blogs);

    dispatch(deleteBlog(blogId));
    dispatch(createMessage(blogId+' blog removed!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  const sortBlogsByLikes = function (a, b) {
    return a.likes - b.likes;
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">
            login
          </button>
        </form>
      </div>
    );
  }

  const hideWhenVisible = { display: addBlogVisible ? "none" : "" };
  const showWhenVisible = { display: addBlogVisible ? "" : "none" };

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm createBlog={addBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>

      {blogs.sort(sortBlogsByLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          username={user.username}
          cancelBlog={removeBlog}
          incrementLike={addLike}
        />
      ))}
    </div>
  );
};

export default App;
