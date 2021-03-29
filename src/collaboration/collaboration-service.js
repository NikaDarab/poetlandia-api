const CollaborationService = {
  getAllCollaborations(knex, user_id) {
    return knex.from("collaboration").select("*").where({ user_id: user_id });
  },

  insertCollaboration(knex, newCollaboration) {
    return knex
      .insert(newCollaboration)
      .into("collaboration")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },

  getById(knex, id) {
    return knex.from("collaboration").select("*").where("id", id).first();
  },

  deleteCollaboration(knex, id) {
    return knex("collaboration").where({ id }).delete();
  },

  updateCollaboration(knex, id, newCollaborationFields) {
    return knex("collaboration").where({ id }).update(newCollaborationFields);
  },
};

module.exports = CollaborationService;
