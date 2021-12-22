const blogRouter = require('express').Router()
const Blog = require('../models/blogs')
const User = require('../models/users')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id
  })



  if (!blog.title || !blog.url) {
    response.status(400).end()
  } 

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)

  await user.save()

  response.status(201).json(savedBlog)


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