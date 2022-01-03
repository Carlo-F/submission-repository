import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, username, cancelBlog }) => {
  const [blogLikes, setLikes] = useState(blog.likes??0)
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const addLike = async () => {

    try {
      setLikes(blogLikes + 1)
      
      const updatedBlog = {
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blogLikes + 1
      }

      await blogService.update(updatedBlog, blog.id)

    } catch (exception) {
      console.log(exception)
    }

  }

  const removeBlog = async () => {
    try {
      if (window.confirm('delete?')) {
        cancelBlog(blog.id)
      }
      
    } catch (exception) {
      console.log(exception)
    }
  }
      
  return (
    <div>
      <p>
        <strong>{blog.title}</strong>
        <button onClick={() => setBlogDetailsVisible(!blogDetailsVisible)}>{blogDetailsVisible ? 'hide' : 'show details'}</button>
      </p>
      <ul style={showWhenVisible}>
        <li>author: {blog.author}</li>
        <li>url: {blog.url}</li>
        <li>likes: {blogLikes} <button onClick={() => addLike()}>like</button></li>
        {blog.user.username === username && (
        <li><button onClick={() => removeBlog()}>delete</button></li>
        )}
      </ul>

    </div>
  )
}

export default Blog