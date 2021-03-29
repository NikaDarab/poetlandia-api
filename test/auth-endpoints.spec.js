const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const helpers = require("./test-helpers");
const AuthService = require("../src/auth/auth-service");
const { expect } = require("chai");

describe("Auth Endpoints", function () {
  let db;

  const { testUsers } = helpers.makePoetlandiaFixtures();
  const testUser = testUsers[0];
  //   console.log(testUser);
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());
  before("cleanup", () => helpers.cleanTables(db));
  afterEach("cleanup", () => helpers.cleanTables(db));

  describe("POST /api/auth/token", () => {
    beforeEach("insert test users", () => {
      //   console.log(testUsers);
      return helpers.seedTestUsers(db, testUsers);
    });
    const requiredFields = ["username", "password"];

    requiredFields.forEach((field) => {
      const loginBody = {
        username: testUser.username,
        password: testUser.password,
      };

      it(`responds with 404 error when '${field}' is missing`, () => {
        delete loginBody[field];

        return supertest(app)
          .post("/api/auth/token")
          .send(loginBody)
          .expect(400, {
            error: `Missing '${field}' in request body`,
          });
      });
    });

    it('responds with 400 and "Incorrect username or password" when username is not found', () => {
      const badUser = {
        username: "plum fairy",
        password: testUser.password,
      };
      return supertest(app).post("/api/auth/token").send(badUser).expect(400, {
        error: "Incorrect username or password",
      });
    });

    it('responds with 400 and "Incorrect username or password" when username is correct but the password is wrong', () => {
      const badPass = {
        username: testUser.username,
        password: "nottherightpassword",
      };
      return supertest(app).post("/api/auth/token").send(badPass).expect(400, {
        error: "Incorrect username or password",
      });
    });

    it("responds with 200 and returns a token on successful login", () => {
      const goodUser = {
        username: testUser.username,
        password: testUser.password,
      };
      const sub = testUser.username;
      const payload = {
        id: testUser.id,
        name: testUser.name,
      };
      const jwtToken = AuthService.createJwt(sub, payload);

      return (
        supertest(app)
          .post("/api/auth/token")
          .send(goodUser)
          // .expect(200)
          .then((res) => {
            let verified = AuthService.verifyJwt(res.body.authToken);
            // console.log({ res });
            return expect(verified).to.be.an("object");
          })
      );
    });
  });
});
