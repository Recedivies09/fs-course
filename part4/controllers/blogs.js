const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const user = request.user;
  const body = request.body;

  if (!body.title && !body.url) {
    return response.status(400).end();
  }

  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user._id,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const user = request.user;
  const userid = user._id;
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  if (blog.user.toString() === userid.toString()) {
    await Blog.deleteOne({ _id: blogId });
    return response.status(204).end();
  }
  response.status(403).send({ error: "you don't have access to delete blog." });
});

blogsRouter.put("/:id", async (request, response) => {
  const user = request.user;
  const body = request.body;
  const userId = user._id;
  const blogId = request.params.id;
  const updateBlog = {
    url: body.url,
    title: body.title,
    author: body.author,
    likes: body.likes,
  };
  const blog = await Blog.findById(blogId);
  if (blog.user.toString() === userId.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId, updateBlog, {
      new: true,
    }).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    if (updatedBlog) {
      return response.json(updatedBlog);
    } else {
      return response.status(400).end();
    }
  }
  response.status(403).send({ error: "you don't have access to update blog." });
});

module.exports = blogsRouter;
