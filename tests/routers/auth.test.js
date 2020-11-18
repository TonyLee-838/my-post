const request = require("supertest");
const jwt = require("jsonwebtoken");

const { env } = require("../../src/helper/config");
const { deleteAllUserFromDB } = require("../../src/db/api/users");

describe("Authentication API /api/auth", () => {
  let server;
  
  beforeEach(() => {
    server = require("../../src/index");
  });
  
  afterEach(async () => {
    await deleteAllUserFromDB();
    await server.close();
  });

  describe("POST /", () => {
    let email = "test@test.com";
    let password = "test_password";

    beforeEach(async () => {
      await request(server)
        .post("/api/users")
        .send({ email, password, name: "test-name" });
    });
    it("should return correct auth-token when user successfully login", async () => {
      const { text: token } = await request(server)
        .post("/api/auth")
        .send({ email, password });

      const payload = jwt.verify(token, env("jwt_secret_key"));

      expect(payload.email).toEqual(email);
    });
  });
});
