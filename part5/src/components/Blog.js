import React from 'react'
const Blog = ({blog}) => (
  <div>
    <strong>{blog.title}</strong> by <strong>{blog.author}</strong>
  </div>  
)

export default Blog