const blogRouter = require("express").Router();
const Blog = require("../models/blogs");
const User = require("../models/users");
const jwt = require("jsonwebtoken");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const loggedUser = request.user;
  const body = request.body;

  if (loggedUser === null) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(loggedUser.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    likes: body.likes || 0,
    url: body.url,
    user: user._id,
  });

  if (!blog.title || !blog.url) {
    response.status(400).end();
  }

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);

  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;
    const blog = await Blog.findById(request.params.id);

    if (user === null) {
      return response.status(401).json({ error: "token missing or invalid" });
    } else if (blog.user.toString() !== user.id) {
      return response.status(401).json({ error: "Not authorized" });
    }

    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  }
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  response.status(200).json(updatedBlog);
});

blogRouter.post("/:id/comments", async (request, response) => {
  const body = request.body;

  const blog = await Blog.findById(request.params.id);
  blog.comments.push({ comment: body.comment });
  const result = await blog.save();
  response.status(200).json(result.comments.at(-1));
});

module.exports = blogRouter;
