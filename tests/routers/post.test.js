const request = require("supertest");
const jwt = require("jsonwebtoken");

const {
  getPostsFromDB,
  insertNewPostToDB,
  deleteAllPostsFromDB,
} = require("../../src/db/api/post");
const { deleteAllUserFromDB } = require("../../src/db/api/users");
const generateObjectId = require("../../src/db/helper/objectId");
const { env } = require("../../src/helper/config");

const API_ENDPOINT = "/api/posts";

describe("Posts API", () => {
  let server;
  let user;
  let token;
  let post;
  let category;

  beforeEach(async () => {
    server = require("../../src/index");
    let res = await request(server).post("/api/users").send({
      email: "test@test.com",
      name: "testName",
      password: "test-test",
    });
    user = res.body;

    token = jwt.sign(
      { email: user.email, isAdmin: user.isAdmin, id: user._id },
      env("jwt_secret_key")
    );

    res = await request(server)
      .post("/api/categories")
      .set("x-auth-token", token)
      .send({
        name: "test",
        icon: "SiTest",
        color: "#000000",
      });
    category = res.body;
    post = {
      title: "title",
      userId: user._id,
      contentMd: "# Title",
      contentHtml: "<h1>Title</h1>",
      categoryId: category._id,
    };
  });

  afterEach(async () => {
    await deleteAllPostsFromDB();
    await deleteAllUserFromDB();
    await server.close();
  });

  describe("GET /", () => {
    beforeEach(async () => {
      await insertNewPostToDB(post);
    });

    it("should list all the posts", async () => {
      const res = await request(server).get(API_ENDPOINT);

      expect(res.body.length).toBe(1);
      expect(res.body[0]).toHaveProperty("userId", post.userId);
      expect(res.body[0]).toHaveProperty("title", "title");
    });
  });
  describe("GET /:id", () => {
    let postId;
    beforeEach(async () => {
      const res = await insertNewPostToDB(post);
      postId = res._id;
    });

    const exec = () => request(server).get(`${API_ENDPOINT}/${postId}`);

    it("should return 404 Error if post for the given id is not found.", async () => {
      postId = generateObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });
    it("should return 200 and found post", async () => {
      const res = await exec();

      const received = res.body[0];

      expect(received).toHaveProperty("title", post.title);
      expect(received).toHaveProperty("userId", post.userId);
      expect(received).toHaveProperty("categoryId", post.categoryId);
    });
  });
  describe("POST /", () => {
    const exec = () =>
      request(server).post(API_ENDPOINT).set("x-auth-token", token).send(post);

    it("should return 401 Error if user dose not login", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 Error if invalid title provided", async () => {
      post.title = "";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 404 Error if given userId is not found.", async () => {
      post.userId = generateObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 200 and created post, and should store the created post in db", async () => {
      const res = await exec();
      const found = await getPostsFromDB({ title: post.title });

      expect(res.body).toMatchObject(post);
      expect(found[0]).toHaveProperty("title", "title");
    });
  });
  describe("PUT /:id", () => {
    let postId;
    let updateData;

    beforeEach(async () => {
      const res = await insertNewPostToDB(post);
      postId = res._id;
      updateData = {
        title: "newTitle",
        contentMd: "# New Title",
      };
    });

    const exec = () =>
      request(server)
        .put(`${API_ENDPOINT}/${postId}`)
        .set("x-auth-token", token)
        .send(updateData);

    it("should return 401 Error if user dose not login", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 403 Error if user is not the author of this post", async () => {
      token = jwt.sign(
        {
          email: "test2@test.com",
          isAdmin: user.isAdmin,
          id: generateObjectId(),
        },
        env("jwt_secret_key")
      );

      const res = await exec();

      expect(res.status).toBe(403);
    });
    it("should return 404 if post for the given postId is not found.", async () => {
      postId = generateObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should store the updated post in db and return it.", async () => {
      const res = await exec();
      expect(res.status).toBe(200);
    });
  });
  describe("DELETE /:id", () => {
    let postId;
    beforeEach(async () => {
      const res = await insertNewPostToDB(post);
      postId = res._id;
    });

    const exec = () =>
      request(server)
        .delete(`${API_ENDPOINT}/${postId}`)
        .set("x-auth-token", token);

    it("should return 401 Error if user dose not login", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 404 Error if post for the given id is not found.", async () => {
      postId = generateObjectId();

      const res = await exec();

      expect(res.status).toBe(404);
    });

    it("should return 200 and delete the post", async () => {
      const res = await exec();

      expect(res.body).toMatchObject(post);
      const postsInDb = await getPostsFromDB();
      expect(postsInDb.length).toBe(0);
    });
  });
});
