// const { expect } = require("chai");
// const knex = require("knex");
// const app = require("../src/app");
// const { makePoemArray } = require("./poem.fixtures");
// describe("Poem Endpoints", function () {
//   let db;
//   before("make knex instance", () => {
//     db = knex({
//       client: "pg",
//       connection: process.env.TEST_DATABASE_URL,
//     });
//     app.set("db", db);
//   });

//   after("disconnect from db", () => db.destroy());

//   before("clean the table", () => db("poem").truncate());
//   afterEach("cleanup", () => db("poem").truncate());

//   describe("GET /api/poem", () => {
//     context("Given no poem", () => {
//       it("responds with 200 and an empty list", () => {
//         return supertest(app)
//           .get("/api/poem")
//           .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
//           .expect(200, []);
//       });
//     });
//     context("Given there are poem in the database", () => {
//       const testPoem = makePoemArray();

//       beforeEach("insert poem", () => {
//         return db.into("poem").insert(testPoem);
//       });
//       it(" responds with 200 and all the poems", () => {
//         return supertest(app)
//           .get("/api/poem")
//           .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
//           .expect(200, testPoem);
//       });
//     });
//   });

//   describe("GET  /poem/:poem_id", () => {
//     context("Given no poem", () => {
//       it("responds with 404", () => {
//         const poemId = 123456;
//         return supertest(app)
//           .get(`/api/poem/${poemId}`)
//           .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
//           .expect(404, { error: { message: "Poem doesn't exist" } });
//       });
//     });

//     context("Given there are poem in the database", () => {
//       const testPoem = makePoemArray();
//       beforeEach("insert poem", () => {
//         return db.into("poem").insert(testPoem);
//       });
//       it(" responds with 200 and the specified poem", () => {
//         const poemId = 2;
//         const expectedPoem = testPoem[poemId - 1];
//         return supertest(app)
//           .get(`/api/poem/${poemId}`)
//           .set("Authorization", `BEARER ${process.env.API_TOKEN}`)
//           .expect(200, expectedPoem);
//       });
//     });
//   });
//   describe("POST /api/poem", () => {
//     it("creates an poem, responding with 201 and the new poem", function () {
//       this.retries(3);
//       const newPoem = {
//         user_id: 2,
//         title: "a new poem",
//         author: "Edgar",
//         lines: ["a poem, by edgar"],
//         date_created: "2004-10-19 11:23:54",
//       };
//       return supertest(app)
//         .post("/api/poem")
//         .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//         .send(newPoem)
//         .expect(201)
//         .expect((res) => {
//           expect(res.body.user_id).to.eql(newPoem.user_id);
//           expect(res.body.title).to.eql(newPoem.title);
//           expect(res.body.author).to.equal(newPoem.author);
//           expect(res.body.lines).to.eql(newPoem.lines);
//           expect(res.body.date_created).to.eql(newPoem.date_created);
//           expect(res.body).to.have.property("id");
//           expect(res.headers.location).to.eql(`/poem/${res.body.id}`);
//         });
//     });
//     const requiredFields = [
//       "user_id",
//       "title",
//       "author",
//       "lines",
//       "date_created",
//     ];

//     requiredFields.forEach((field) => {
//       const newPoem = {
//         user_id: 2,
//         title: "lunch stuff",
//         author: "nika darab",
//         lines: ["for luch, i need a burger"],
//         date_created: "2004-10-19 11:23:54",
//       };

//       it(`responds with 400 and an error message when the '${field}' is missing`, () => {
//         delete newPoem[field];

//         return supertest(app)
//           .post("/api/poem")
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .send(newPoem)
//           .expect(400, {
//             error: { message: `Missing '${field}' in request body ` },
//           });
//       });
//     });
//   });
//   describe("DELETE /poem/:poem_id", () => {
//     context("Given no poem", () => {
//       it("responds with 404", () => {
//         const poemId = 123456;
//         return supertest(app)
//           .delete(`/api/poem/${poemId}`)
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .expect(404, { error: { message: "Poem doesn't exist" } });
//       });
//     });
//     context("Given there are poem in the database", () => {
//       const testPoem = makePoemArray();

//       beforeEach("insert poem", () => {
//         return db.into("poem").insert(testPoem);
//       });

//       it("responds with 204 and removes the poem", () => {
//         const idToRemove = 2;
//         const expectedPoem = testPoem.filter((poem) => poem.id !== idToRemove);
//         return supertest(app)
//           .delete(`/api/poem/${idToRemove}`)
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .expect(204)
//           .then((res) =>
//             supertest(app)
//               .get("/api/poem")
//               .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//               .expect(expectedPoem)
//           );
//       });
//     });
//   });

//   describe("PATCH /api/poem/:poem_id", () => {
//     context("Given no poem", () => {
//       it("responds with 404", () => {
//         const poemId = 123456;
//         return supertest(app)
//           .patch(`/api/poem/${poemId}`)
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .expect(404, { error: { message: "Poem doesn't exist" } });
//       });
//     });
//     context("Given there are poem in the database", () => {
//       const testPoem = makePoemArray();

//       beforeEach("insert poem", () => {
//         return db.into("poem").insert(testPoem);
//       });

//       it("responds with 204 and updates the poem", () => {
//         const idToUpdate = 2;
//         const updatePoem = {
//           user_id: 2,
//           title: "lunch stuff and dinner",
//           author: "nika darab and sister",
//           lines: ["for lunch, i need a burger and dinner the same"],
//           date_created: "2004-10-19 11:23:54",
//         };
//         const expectedPoem = {
//           ...testPoem[idToUpdate - 1],
//           ...updatePoem,
//         };
//         return supertest(app)
//           .patch(`/api/poem/${idToUpdate}`)
//           .send(updatePoem)
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .expect(204)
//           .then((res) =>
//             supertest(app)
//               .get(`/api/poem/${idToUpdate}`)
//               .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//               .expect(expectedPoem)
//           );
//       });
//       it(`responds with 400 when no required fields supplied`, () => {
//         const idToUpdate = 2;
//         return supertest(app)
//           .patch(`/api/poem/${idToUpdate}`)
//           .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
//           .send({ irrelevantField: "foo" })
//           .expect(400, {
//             error: {
//               message: `Request body must contain  'user_id', 'author', 'title','lines','date_created'`,
//             },
//           });
//       });
//     });
//   });
// });
