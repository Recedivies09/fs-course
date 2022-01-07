const supertest = require("supertest");
const mongoose = require("mongoose");
const listHelper = require("./list_helper");
const app = require("../app");
const api = supertest(app);
const bcrypt = require("bcrypt");

const Blog = require("../models/blog");
const User = require("../models/user");

let token = "";

beforeEach(async () => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({
    username: "root",
    password: passwordHash,
    name: "Adhi",
    blogs: [],
  });

  await user.save();

  const body = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  };
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

  /* to attach the token authorization to header */
  const payload = {
    username: user.username,
    password: "sekret",
  };
  const response = await api.post("/api/login").send(payload);
  token = response.body.token;

  await Blog.insertMany(listHelper.initialBlogs);
}, 10000);

describe("total likes", () => {
  test("of empty list is zero", async () => {
    const result = await listHelper.totalLikes([]);
    expect(result).toBe(0);
  });

  test("when list has only one blog, equals the likes of that", async () => {
    const result = await listHelper.totalLikes(listHelper.listWithOneBlog);
    expect(result).toBe(listHelper.listWithOneBlog[0].likes);
  });

  test("of a bigger list is calculated right", async () => {
    const result = await listHelper.totalLikes(listHelper.initialBlogs);
    expect(result).toBe(36);
  });
});

describe("favorite Blog", () => {
  test("that has most likes", async () => {
    const result = await listHelper.favoriteBlog(listHelper.initialBlogs);
    expect(result).toBe(12);
  });

  test("author that has most likes", async () => {
    const result = await listHelper.mostBlogs(listHelper.initialBlogs);
    expect(result).toStrictEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });

  test("author have blogs that the largest amount of likes", async () => {
    const result = await listHelper.mostLikes(listHelper.initialBlogs);
    expect(result).toStrictEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

describe("Blog List tests", () => {
  test("List blogs are returned a json", async () => {
    await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("List all blogs are returned", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    expect(response.body).toHaveLength(listHelper.initialBlogs.length + 1);
  });

  test("verifies unique blog posts id", async () => {
    const response = await api
      .get("/api/blogs")
      .set("Authorization", `Bearer ${token}`);

    response.body.map((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe("Create a blog", () => {
  test("Create verifies successfully created a new blog post", async () => {
    const newBlog = {
      title: "Ahmadhi's Blog",
      author: "Recedivies",
      url: "https://github.com/Recedivies",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await listHelper.blogInDb();
    expect(blogAtEnd).toHaveLength(listHelper.initialBlogs.length + 1 + 1);

    const contents = blogAtEnd.map((blog) => blog.author);
    expect(contents).toContain("Recedivies");
  });

  test("verifies if 'likes' property is missing will by defauly = 0", async () => {
    const newBlog = {
      title: "Ahmadhi's Blog",
      author: "Recedivies",
      url: "https://github.com/Recedivies",
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const blogAtEnd = await listHelper.blogInDb();

    const contents = blogAtEnd.find((blog) => blog.author === newBlog.author);
    expect(contents.likes).toBe(0);
  });

  test("verifies if title and url are missing return 400", async () => {
    const newBlog = {
      author: "Recedivies",
      likes: 5,
    };
    await api
      .post("/api/blogs")
      .set("Authorization", `Bearer ${token}`)
      .send(newBlog)
      .expect(400);
  });

  test("verifies if unauthorized user create new blog return 401", async () => {
    const newBlog = {
      author: "Recedivies",
      likes: 5,
    };
    await api.post("/api/blogs").send(newBlog).expect(401);
  });
});

describe("update of a blog", () => {
  test("succeeds with status code 200 if id is valid", async () => {
    const blogAtStart = await listHelper.blogInDb();
    const blogToUpdate = blogAtStart[0];

    const dataUpdate = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(dataUpdate)
      .expect(200);

    const blogAtEnd = await listHelper.blogInDb();
    const contents = blogAtEnd.find((blog) => blog.id === blogToUpdate.id);
    expect(contents.likes).toBe(blogToUpdate.likes + 1);
  });
});

describe("deletion of a blog", () => {
  test("succeeds with status code 204 if id is valid", async () => {
    const blogAtStart = await listHelper.blogInDb();
    const blogToDelete = blogAtStart[0];
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set("Authorization", `bearer ${token}`)
      .expect(204);
    const blogAtEnd = await listHelper.blogInDb();
    expect(blogAtEnd).toHaveLength(listHelper.initialBlogs.length - 1 + 1);
  });
  test("fails with status code 400 if id is invalid", async () => {
    await api
      .delete("/api/blogs/32313231")
      .set("Authorization", `Bearer ${token}`)
      .expect(400);

    const blogAtEnd = await listHelper.blogInDb();
    expect(blogAtEnd).toHaveLength(listHelper.initialBlogs.length + 1);
  });
});

describe("test check validation for user", () => {
  test("creation succeeds with a valid data.", async () => {
    const userAtStart = await listHelper.userInDb();

    const newUser = {
      username: "Recedivies",
      password: "ahmadhi3231",
      name: "Ahmadhi",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await listHelper.userInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("invalid data min 3 username length returned 400", async () => {
    const userAtStart = await listHelper.userInDb();

    const newUser = {
      username: "Ah",
      password: "ahmadhi3231",
      name: "Ahmadhi",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await listHelper.userInDb();
    expect(usersAtEnd).toHaveLength(userAtStart.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
