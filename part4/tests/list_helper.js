const Blog = require("../models/blog");
const User = require("../models/user");

const totalLikes = (blogs) => {
  let like = 0;
  blogs.map((blog) => {
    if (blog.likes) like += blog.likes;
  });
  return like;
};

const favoriteBlog = (blogs) => {
  let maxLike = 0;
  blogs.map((blog) => {
    if (blog.likes) maxLike = Math.max(maxLike, blog.likes);
  });
  return maxLike;
};

const mostBlogs = (blogs) => {
  const arr = {};
  let topBlog = { author: "", blogs: 0 };
  blogs.map((blog) => {
    if (!arr[blog.author]) {
      arr[blog.author] = 1;
    } else {
      arr[blog.author]++;
    }
    if (topBlog.blogs < arr[blog.author]) {
      topBlog = { author: blog.author, blogs: arr[blog.author] };
    }
  });
  return topBlog;
};

const mostLikes = (blogs) => {
  const arr = {};
  let topLike = { author: "", likes: 0 };
  blogs.map((blog) => {
    if (!arr[blog.author]) {
      arr[blog.author] = blog.likes;
    } else {
      arr[blog.author] += blog.likes;
    }
    if (topLike.likes < arr[blog.author]) {
      topLike = { author: blog.author, likes: arr[blog.author] };
    }
  });
  return topLike;
};

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const blogInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const userInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs,
  listWithOneBlog,
  blogInDb,
  userInDb,
};
