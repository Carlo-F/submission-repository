import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import AddBlogForm from './components/AddBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [addBlogVisible, setAddBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      },2000)
    }


  }

  const handleLogout = async (event) => {
    event.preventDefault()

    setUser(null)
    window.localStorage.removeItem('loggedBlogappUser')
  }

  const addBlog = async (blogObject) => {
    await blogService.create(blogObject)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setMessage('New blog added!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const removeBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setMessage('Blog removed!')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const sortBlogsByLikes = function (a, b) {
    return a.likes - b.likes
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} />
        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const hideWhenVisible = { display: addBlogVisible ? 'none' : '' }
  const showWhenVisible = { display: addBlogVisible ? '' : 'none' }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <div style={hideWhenVisible}>
        <button onClick={() => setAddBlogVisible(true)}>create new blog</button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm createBlog={addBlog} />
        <button onClick={() => setAddBlogVisible(false)}>cancel</button>
      </div>

      {blogs.sort(sortBlogsByLikes).map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} cancelBlog={removeBlog} />
      )}
    </div>
  )
}

export default App