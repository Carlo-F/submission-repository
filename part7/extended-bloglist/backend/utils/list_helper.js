const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let total = 0;

  blogs.map((blog) => (total += blog.likes));

  return total;
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));

  const result = blogs.find(({ likes }) => likes === mostLikes);

  return result;
};

const mostBlogs = (blogs) => {
  return lodash
    .chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, blogs: lodash.size(value) }))
    .maxBy("blogs")
    .value();
};

const mostLikes = (blogs) => {
  return lodash
    .chain(blogs)
    .groupBy("author")
    .map((value, key) => ({ author: key, likes: lodash.sumBy(value, "likes") }))
    .maxBy("likes")
    .value();
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
