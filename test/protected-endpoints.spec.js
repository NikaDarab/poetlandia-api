const app = require("../src/app");
const helpers = require("./test-helpers");

describe("Protected Endpoints", function () {
  let db;

  const testUsers = helpers.makeTestUsersArray();
  const testPoem = helpers.makeTestPoemArray();
  const testCollaboration = helpers.makeTestCollaborationArray();

  before("make knex instance", () => {
    db = helpers.makeKnexInstance();
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("cleanup", () => helpers.cleanTables(db));

  afterEach("cleanup", () => helpers.cleanTables(db));

  beforeEach("insert users, poems ", () => {
    return helpers.seedTestPoemTables(
      db,
      testUsers,
      testPoem,
      testCollaboration
    );
  });

  // beforeEach("insert user,collaborations", () => {
  //   return helpers.seedTestCollaborationTables(
  //     db,
  //     testUsers,
  //     testCollaboration
  //   );
  // });

  const protectedEndpoints = [
    {
      name: "GET /api/poem",
      path: "/api/poem",
      method: supertest(app).get,
    },
    {
      name: "GET /api/collaboration",
      path: "/api/collaboration",
      method: supertest(app).get,
    },
  ];

  protectedEndpoints.forEach((endpoint) => {
    console.log(endpoint);
    describe(endpoint.name, () => {
      it(`responds 401 'Missing bearer token' when no bearer token`, () => {
        return endpoint
          .method(endpoint.path)
          .expect(401, { error: `Missing bearer token` });
      });

      it(`responds 401 'Unauthorized request' when invalid JWT secret`, () => {
        const validUser = testUsers[0];
        const invalidSecret = "bad-secret";
        return endpoint
          .method(endpoint.path)
          .set(
            "Authorization",
            helpers.makeAuthHeader(validUser, invalidSecret)
          )
          .expect(401, { error: `Unauthorized request` });
      });

      it(`responds 401 'Unauthorized request' when invalid sub in payload`, () => {
        const invalidUser = { username: "user-not-existy", id: 1 };
        return endpoint
          .method(endpoint.path)
          .set("Authorization", helpers.makeAuthHeader(invalidUser))
          .expect(401, { error: `Unauthorized request` });
      });
    });
  });
});
