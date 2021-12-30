import React, {useState} from 'react'
const Blog = ({ blog }) => {
  
  const [blogDetailsVisible, setBlogDetailsVisible] = useState(false)
  const hideWhenVisible = { display: blogDetailsVisible ? 'none' : '' }
  const showWhenVisible = { display: blogDetailsVisible ? '' : 'none' }
      
  return (
    <div>
      <p>
        <strong>{blog.title}</strong>
        <button onClick={() => setBlogDetailsVisible(!blogDetailsVisible)}>{blogDetailsVisible ? 'hide' : 'show details'}</button>
      </p>
      <ul style={showWhenVisible}>
        <li>author: {blog.author}</li>
        <li>url: {blog.url}</li>
        <li>likes: {blog.likes} <button>like</button></li>
      </ul>

    </div>
  )
}

export default Blog