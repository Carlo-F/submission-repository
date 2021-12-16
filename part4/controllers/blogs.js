const blogRouter = require('express').Router()
const Blog = require('../models/blogs')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url
  })

  if (!blog.title || !blog.url) {
    response.status(400).end()
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)

})

module.exports = blogRouter