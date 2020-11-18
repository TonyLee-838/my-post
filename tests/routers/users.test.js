const request = require("supertest");
const jwt = require("jsonwebtoken");
const { env } = require("../../src/helper/config");
const {
  deleteAllUserFromDB,
  insertNewUserIntoDB,
} = require("../../src/db/api/users");
const generateObjectId = require("../../src/db/helper/objectId");

describe("Users API /api/users", () => {
  let server;
  beforeEach(() => {
    server = require("../../src/index");
  });

  afterEach(async () => {
    await deleteAllUserFromDB();
    await server.close();
  });

  describe("GET /", () => {
    it("should return all users", async () => {
      await insertNewUserIntoDB({
        name: "testUser1",
        password: "password1",
        email: "testEmail1@test.com",
      });

      const response = await request(server).get("/api/users");

      expect(response.body.length).toBe(1);
      expect(response.body[0]).toMatchObject({ name: "testUser1" });
    });
  });

  describe("POST /", () => {
    let name;

    beforeEach(() => {
      name = "testUser1";
    });
    const exec = async () => {
      const testUser = {
        name,
        password: "password1",
        email: "testEmail1@test.com",
      };

      return await request(server).post("/api/users").send(testUser);
    };

    it("should return 400 if invalid input provided", async () => {
      name = "";

      const response = await exec();
      expect(response.status).toBe(400);
    });

    it("should return created user if valid provided ", async () => {
      const response = await exec();
      expect(response.body.name).toMatch(name);
    });
  });

  describe("PUT /:id", () => {
    let user;
    let id;
    let inputData;
    let token;

    beforeEach(async () => {
      inputData = { name: "testName2" };
      user = {
        name: "testName1",
        password: "123456",
        email: "test@test.com",
        isAdmin: false,
      };

      user = await insertNewUserIntoDB(user);

      token = jwt.sign(
        { email: user.email, isAdmin: user.isAdmin },
        env("jwt_secret_key")
      );
      id = user._id;
    });

    const exec = async () => {
      return await request(server)
        .put(`/api/users/${id}`)
        .set("x-auth-token", token)
        .send(inputData);
    };

    it("should return 401 if user doesn't login and provide auth-token", async () => {
      token = "";

      const response = await exec();

      expect(response.status).toBe(401);
    });

    it("should return 404 if provided userId doesn't exist", async () => {
      id = generateObjectId();

      const response = await exec();

      expect(response.status).toBe(404);
    });

    it("should return 400 if invalid input data provided ", async () => {
      inputData = { name: "" };

      const response = await exec();

      expect(response.status).toBe(400);
    });

    it("should return updated user if valid user provided", async () => {
      const response = await exec();

      expect(response.status).toBe(200);
    });
  });


  describe("DELETE /:id", () => {
    let user;
    let id;
    let token;
  
    beforeEach(async () => {
      user = {
        name: "testName1",
        password: "123456",
        email: "test@test.com",
        isAdmin: true,
      };
  
      user = await insertNewUserIntoDB(user);
  
      token = jwt.sign(
        { email: user.email, isAdmin: user.isAdmin },
        env("jwt_secret_key")
      );
      id = user._id;
    });
  
    const exec = () =>
      request(server)
        .delete(`/api/users/${id}`)
        .set("x-auth-token", token)
        .send();
  
    it("should return 401 if user doesn't login and provide auth-token", async () => {
      token = "";
  
      const response = await exec();
  
      expect(response.status).toBe(401);
    });
  
    it("should return 404 if provided userId doesn't exist", async () => {
      id = generateObjectId();
  
      const response = await exec();
  
      expect(response.status).toBe(404);
    });
  
    it("should return updated user if valid user provided", async () => {
      const response = await exec();
  
      expect(response.status).toBe(200);
    });
  });
  
});

