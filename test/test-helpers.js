const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const knex = require("knex");

function makeKnexInstance() {
  return knex({
    client: "pg",
    connection: process.env.TEST_DB_URL,
  });
}

function makeTestUsersArray() {
  return [
    {
      id: 1,
      username: "test@test1.com",
      password: "Password!1",
      name: "test 1",
    },
    {
      id: 2,
      username: "test@test2.com",
      password: "Password!2",
      name: "test 2",
    },
    {
      id: 3,
      username: "test@test3.com",
      password: "Password!3",
      name: "test 3",
    },
    {
      id: 4,
      username: "test@test4.com",
      password: "Password!4",
      name: "test 4",
    },
    {
      id: 5,
      username: "test@test5.com",
      password: "Password!5",
      name: "test 5",
    },
  ];
}

function makeTestPoemArray() {
  return [
    {
      id: 1,
      user_id: 1,
      title: "test poem1",
      author: "test1 user",
      lines: ["test poem, 1"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 2,
      user_id: 2,
      title: "test poem2",
      author: "test2 user",
      lines: ["test poem, 2"],
      date_created: "2021-03-05T16:28:32.615Z",
    },
    {
      id: 3,
      user_id: 3,
      title: "test poem3",
      author: "test3 user",
      lines: ["test poem, 3"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 4,
      user_id: 3,
      title: "test poem4",
      author: "test4 user",
      lines: ["test poem, 4"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 5,
      user_id: 5,
      title: "test poem5",
      author: "test5 user",
      lines: ["test poem, 5"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 6,
      user_id: 1,
      title: "test poem6",
      author: "test6 user",
      lines: ["test poem, 6"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 7,
      user_id: 2,
      title: "test poem7",
      author: "test7 user",
      lines: ["test poem, 7"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 8,
      user_id: 3,
      title: "test poem8",
      author: "test8 user",
      lines: ["test poem, 8"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 9,
      user_id: 2,
      title: "test poem9",
      author: "test9 user",
      lines: ["test poem, 9"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 10,
      user_id: 5,
      title: "test poem10",
      author: "test10 user",
      lines: ["test poem, 10"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
  ];
}
function makeTestLibraryArray() {
  return [
    {
      id: 1,

      title: "test poem1",
      author: "test1 user",
      lines: ["test poem, 1"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 2,

      title: "test poem2",
      author: "test2 user",
      lines: ["test poem, 2"],
      date_created: "2021-03-05T16:28:32.615Z",
    },
    {
      id: 3,

      title: "test poem3",
      author: "test3 user",
      lines: ["test poem, 3"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 4,

      title: "test poem4",
      author: "test4 user",
      lines: ["test poem, 4"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 5,

      title: "test poem5",
      author: "test5 user",
      lines: ["test poem, 5"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 6,

      title: "test poem6",
      author: "test6 user",
      lines: ["test poem, 6"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 7,

      title: "test poem7",
      author: "test7 user",
      lines: ["test poem, 7"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 8,

      title: "test poem8",
      author: "test8 user",
      lines: ["test poem, 8"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 9,

      title: "test poem9",
      author: "test9 user",
      lines: ["test poem, 9"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 10,

      title: "test poem10",
      author: "test10 user",
      lines: ["test poem, 10"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
  ];
}
function makeTestCollaborationArray() {
  return [
    {
      id: 1,
      user_id: 1,
      title: "test poem1",
      author: "test1 user",
      lines: ["test poem, 1"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 2,
      user_id: 2,
      title: "test poem2",
      author: "test2 user",
      lines: ["test poem, 2"],
      date_created: "2021-03-05T16:28:32.615Z",
    },
    {
      id: 3,
      user_id: 3,
      title: "test poem3",
      author: "test3 user",
      lines: ["test poem, 3"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 4,
      user_id: 3,
      title: "test poem4",
      author: "test4 user",
      lines: ["test poem, 4"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 5,
      user_id: 5,
      title: "test poem5",
      author: "test5 user",
      lines: ["test poem, 5"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 6,
      user_id: 1,
      title: "test poem6",
      author: "test6 user",
      lines: ["test poem, 6"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 7,
      user_id: 2,
      title: "test poem7",
      author: "test7 user",
      lines: ["test poem, 7"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 8,
      user_id: 3,
      title: "test poem8",
      author: "test8 user",
      lines: ["test poem, 8"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 9,
      user_id: 2,
      title: "test poem9",
      author: "test9 user",
      lines: ["test poem, 9"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
    {
      id: 10,
      user_id: 5,
      title: "test poem10",
      author: "test10 user",
      lines: ["test poem, 10"],
      date_created: "2021-02-05T16:28:32.615Z",
    },
  ];
}

function cleanTables(db) {
  return db.transaction((trx) =>
    trx
      .raw(
        `TRUNCATE
            "user",
            "poem",
            "library",
            "collaboration"
            `
      )
      .then(() =>
        Promise.all([
          trx.raw(`ALTER SEQUENCE user_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE poem_id_seq minvalue 0 START WITH 1`),
          trx.raw(`ALTER SEQUENCE library_id_seq minvalue 0 START WITH 1`),
          trx.raw(
            `ALTER SEQUENCE collaboration_id_seq minvalue 0 START WITH 1`
          ),
          trx.raw(`SELECT setval('user_id_seq', 0)`),
          trx.raw(`SELECT setval('poem_id_seq', 0)`),
          trx.raw(`SELECT setval('library_id_seq', 0)`),
          trx.raw(`SELECT setval('collaboration_id_seq', 0)`),
        ])
      )
  );
}

function makePoetlandiaFixtures() {
  const testUsers = makeTestUsersArray();
  const testLibrary = makeTestLibraryArray();
  const testPoem = makeTestPoemArray();
  const testCollaboration = makeTestCollaborationArray();
  return { testUsers, testLibrary, testPoem, testCollaboration };
}

function seedTestUsers(db, users) {
  const hashUserPasswords = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 1),
  }));

  return db
    .into("user")
    .insert(hashUserPasswords)
    .then(() => {
      return db.raw(
        `SELECT setval('user_id_seq', ?)`,
        users[users.length - 1].id
      );
    });
}

function seedTestLibraryTables(db, users, library) {
  return seedTestUsers(db, users)
    .then(() => {
      return db.into("library").insert(library);
    })
    .then(() => {
      return db.raw(
        `SELECT setval('library_id_seq', ?)`,
        library[library.length - 1].id
      );
    });
}
function seedTestPoemTables(db, users, poem) {
  return seedTestUsers(db, users)
    .then(() => {
      return db.into("poem").insert(poem);
    })
    .then(() => {
      return db.raw(
        `SELECT setval('poem_id_seq', ?)`,
        poem[poem.length - 1].id
      );
    });
}
function seedTestCollaborationTables(db, users, collaboration) {
  return seedTestUsers(db, users)
    .then(() => {
      return db.into("collaboration").insert(collaboration);
    })
    .then(() => {
      return db.raw(
        `SELECT setval('collaboration_id_seq', ?)`,
        collaboration[collaboration.length - 1].id
      );
    });
}
function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.username,
    algorithm: "HS256",
  });
  return `Bearer ${token}`;
}

module.exports = {
  makeKnexInstance,
  makeTestUsersArray,
  makeAuthHeader,
  makeTestPoemArray,
  makeTestLibraryArray,
  makeTestCollaborationArray,
  seedTestUsers,
  seedTestPoemTables,
  seedTestLibraryTables,
  seedTestCollaborationTables,
  cleanTables,
  makePoetlandiaFixtures,
};
