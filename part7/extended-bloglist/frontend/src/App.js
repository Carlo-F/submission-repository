import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, Link, useMatch, useNavigate } from "react-router-dom";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import AddBlogForm from "./components/AddBlogForm";
import User from "./components/User";
import Login from "./components/Login";
import blogService from "./services/blogs";
import loginService from "./services/login";
import userService from "./services/users";
import { createMessage, removeMessage } from './reducers/notificationReducer';
import { setBlogs, createBlog, deleteBlog, likeBlog, commentBlog } from './reducers/blogReducer';
import { logInUser, logOutUser } from './reducers/userReducer';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Button,
} from '@material-ui/core';

let timeoutID;

const App = () => {
  const dispatch = useDispatch();
  const message = useSelector(state => state.message);
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const [addBlogVisible, setAddBlogVisible] = useState(false);

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedBlogappUser");

    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      blogService.setToken(user.token);
      dispatch(logInUser(user));
      userService.getAll().then(users => setUsers(users));
    }
  }, []);

  const match = useMatch('/users/:id');
  const singleUser = match
    ? users.find(user => user.id === match.params.id)
    : null;
  const blogMatch = useMatch('/blogs/:id');
  const blog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null;
  
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      dispatch(logInUser(user));
      setUsername("");
      setPassword("");
      navigate("/");
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

    dispatch(logOutUser());
    window.localStorage.removeItem("loggedBlogappUser");
    navigate("/login");
  };

  const addLike = async (blogObject) => {
    const likedBlog = await blogService.update({ ...blogObject, likes: blogObject.likes+1 }, blogObject.id);

    dispatch(likeBlog(likedBlog.id));
    dispatch(createMessage('Blog liked!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage());
    }, 2000);
  };

  const addComment = async ({ blogId, comment }) => {
    const newComment = await blogService.createComment(blogId, comment);

    dispatch(commentBlog(blogId, newComment));
    dispatch(createMessage('blog commented!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage())
    }, 5000);
  }

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
    await blogService.deleteBlog(blogId);

    dispatch(deleteBlog(blogId));
    dispatch(createMessage('blog removed!'));
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      dispatch(removeMessage());
    }, 5000);
  };

  const sortBlogsByLikes = function (a, b) {
    return a.likes - b.likes;
  };

  const Users = ({ users }) => (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>username</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

  const Blogs = ({ blogs }) => {
    return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm createBlog={addBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
            {blogs.sort(sortBlogsByLikes).map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </TableCell>
              </TableRow>
            ))}
              </TableBody>
          </Table>
        </TableContainer>
    </div>
    )
  }

  if (user === null) {
    return (
      <Login
        message={message}
        username={username}
        password={password}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        setUsername={setUsername}
        setPassword={setPassword} />
    );
  }

  const hideWhenVisible = { display: addBlogVisible ? "none" : "" };
  const showWhenVisible = { display: addBlogVisible ? "" : "none" };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
          </IconButton>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button> 
          {user
            ? <Button onClick={handleLogout}>logout</Button>
            : <Button color="inherit" component={Link} to="/login">login</Button>
          }
        </Toolbar>
      </AppBar>
      <h2>Blogs APP</h2>
      <Notification message={message} />
      <Routes>
        <Route path="/login" element={<Login
          message={message}
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleLogout={handleLogout}
          setUsername={setUsername}
          setPassword={setPassword} />}
        />
        <Route path="/users/:id" element={<User user={singleUser}/>} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} username={user.username} incrementLike={addLike} cancelBlog={removeBlog} createComment={addComment} />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
      </Routes>  
    </Container>
  );
};

export default App;
