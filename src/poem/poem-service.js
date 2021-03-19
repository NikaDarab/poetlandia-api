const PoemService = {
  getAllPoems(knex, user_id) {
    return knex.from("poem").select("*").where("poem.user_id", user_id);
  },

  insertPoem(knex, newPoem) {
    return knex
      .insert(newPoem)
      .into("poem")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("poem").select("*").where("id", id).first();
  },

  deletePoem(knex, id) {
    return knex("poem").where({ id }).delete();
  },

  updatePoem(knex, id, newPoemFields) {
    return knex("poem").where({ id }).update(newPoemFields);
  },
};

module.exports = PoemService;
