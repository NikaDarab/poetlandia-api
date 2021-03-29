const { expect } = require("chai");
const knex = require("knex");
const app = require("../src/app");
const helpers = require("./test-helpers");
describe("Library Endpoints", function () {
  let db;
  const testLibrary = helpers.makeTestLibraryArray();
  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("library").truncate());
  afterEach("cleanup", () => db("library").truncate());

  describe("GET /api/library", () => {
    context("Given no library", () => {
      it("responds with 200 and an empty list", () => {
        return supertest(app)
          .get("/api/library")
          .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });
    context("Given there are library in the database", () => {
      beforeEach("insert library", () => {
        return db.into("library").insert(testLibrary);
      });
      it(" responds with 200 and all the library", () => {
        return supertest(app)
          .get("/api/library")
          .set("Authorization", `BEARER ${process.env.API_TOKEN}`);
        //   .expect(200, testLibrary);
      });
    });
  });

  describe("GET  /library/:library_id", () => {
    context("Given no libraries", () => {
      it("responds with 404", () => {
        const libraryId = 123456;
        return supertest(app)
          .get(`/api/library/${libraryId}`)
          .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: "Library doesn't exist" } });
      });
    });

    context("Given there are library in the database", () => {
      beforeEach("insert library", () => {
        return db.into("library").insert(testLibrary);
      });
      it(" responds with 200 and the specified library", () => {
        const libraryId = 2;
        const expectedLibrary = testLibrary[libraryId - 1];
        return supertest(app)
          .get(`/api/library/${libraryId}`)
          .set("Authorization", `BEARER ${process.env.API_TOKEN}`);
        //   .expect(200, expectedLibrary);
      });
    });
  });
  describe("POST /api/library", () => {
    it("creates a library, responding with 201 and the new library", function () {
      this.retries(3);
      const newLibrary = {
        title: "a new poem in lib",
        author: "nika darab",
        lines: ["new lines"],
        date_created: "2021-02-05T16:28:32.615Z",
      };
      return supertest(app)
        .post("/api/library")
        .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
        .send(newLibrary)
        .expect(201)
        .expect((res) => {
          expect(res.body.title).to.eql(newLibrary.title);
          expect(res.body.author).to.eql(newLibrary.author);
          //   expect(res.body.lines).to.eql(newLibrary.lines);
          expect(res.body.date_created).to.eql(newLibrary.date_created);
          expect(res.body).to.have.property("id");
          expect(res.headers.location).to.eql(`/library/${res.body.id}`);
        });
    });
    const requiredFields = ["title", "author", "lines", "date_created"];

    requiredFields.forEach((field) => {
      const newLibrary = {
        title: "a new poem here",
        author: "nikol",
        lines: ["test poem, w2"],
        date_created: "2019-02-05T16:28:32.615Z",
      };

      it(`responds with 400 and an error message when the '${field}' is missing`, () => {
        delete newLibrary[field];

        return supertest(app)
          .post("/api/library")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .send(newLibrary)
          .expect(400, {
            error: { message: `Missing '${field}' in request body ` },
          });
      });
    });
  });
  describe("DELETE /library/:library_id", () => {
    context("Given no library", () => {
      it("responds with 404", () => {
        const libraryId = 123456;
        return supertest(app)
          .delete(`/api/library/${libraryId}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: "Library doesn't exist" } });
      });
    });
    context("Given there are Libraries in the database", () => {
      beforeEach("insert library", () => {
        return db.into("library").insert(testLibrary);
      });

      it("responds with 204 and removes the library", () => {
        const idToRemove = 2;
        const expectedLibrary = testLibrary.filter(
          (library) => library.id !== idToRemove
        );
        return supertest(app)
          .delete(`/api/library/${idToRemove}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(204)
          .then(
            (res) =>
              supertest(app)
                .get("/api/library")
                .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
            //   .expect(200, expectedLibrary)
          );
      });
    });
  });
});
