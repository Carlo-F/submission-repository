const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/users.js");
const Blog = require("../models/blogs.js");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { title: 1, url: 1 });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if (body.username === undefined || body.password === undefined) {
    return response
      .status(400)
      .json({ error: "Both username and password are required" });
  } else if (body.password.length < 3) {
    return response
      .status(400)
      .json({ error: "Password must be at least 3 characters long" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
