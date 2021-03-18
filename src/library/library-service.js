const LibraryService = {
  getAllLibraries(knex) {
    return knex.select("*").from("library");
  },

  insertLibrary(knex, newLibrary) {
    return knex
      .insert(newLibrary)
      .into("library")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("library").select("*").where("id", id).first();
  },

  deleteLibrary(knex, id) {
    return knex("library").where({ id }).delete();
  },

  updateLibrary(knex, id, newLibraryFields) {
    return knex("library").where({ id }).update(newLibraryFields);
  },
};

module.exports = LibraryService;
