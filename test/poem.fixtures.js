function makePoemArray() {
  return [
    {
      id: 1,
      user_id: 1,
      title: "bahar",
      author: "nika darab",
      lines: ["this is spring"],
      date_created: "2014-10-19 11:23:54",
    },
    {
      id: 2,
      user_id: 1,
      title: "seasons",
      author: "alex rod",
      lines: ["spring is my fave"],
      date_created: "2004-10-29 11:23:54",
    },
    {
      id: 3,
      user_id: 2,
      title: "dinner",
      author: "dinon",
      lines: ["hungry"],
      date_created: "2004-10-19 11:23:54",
    },
    {
      id: 4,
      user_id: 1,
      title: "tired",
      author: "tired dude",
      lines: ["i am tired"],
      date_created: "2004-10-19 12:23:54",
    },
  ];
}

module.exports = {
  makePoemArray,
};
