import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, cancelBlog, incrementLike }) => {
  const [blogLikes, setLikes] = useState(blog.likes)
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }

  const addLike = async () => {

    try {
      setLikes(blogLikes + 1)

      const updatedBlog = {
        id: blog.id,
        user: blog.user.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blogLikes + 1
      }

      incrementLike(updatedBlog)

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
    <div className='blog'>
      <p>
        <strong>{blog.title} by {blog.author}</strong>
        <button onClick={() => setBlogDetailsVisible(!blogDetailsVisible)}>{blogDetailsVisible ? 'hide' : 'show details'}</button>
      </p>
      <ul style={showWhenVisible} className="togglableContent">
        <li>author: {blog.author}</li>
        <li>url: {blog.url}</li>
        <li>likes: <span className="likes">{blogLikes}</span> <button className="likeButton" onClick={() => addLike()}>like</button></li>
        {blog.user.username === username && (
          <li><button onClick={() => removeBlog()}>delete</button></li>
        )}
      </ul>

    </div>
  )
}

Blog.propTypes = {
  username: PropTypes.string.isRequired
}

export default Blog