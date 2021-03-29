const path = require("path");
const express = require("express");
const xss = require("xss");
const CollaborationService = require("./collaboration-service");
const collaborationRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();

const serializeCollaboration = (collaboration) => ({
  id: collaboration.id,
  title: xss(collaboration.title),
  author: xss(collaboration.author),
  lines: xss(collaboration.lines),
  user_id: collaboration.user_id,
  date_created: collaboration.date_created,
});

collaborationRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    // const knexInstance = req.app.get("db", req.user.id);
    CollaborationService.getAllCollaborations(req.app.get("db"), req.user.id)
      .then((collaboration) => {
        res.json(collaboration.map(serializeCollaboration));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, author, lines, user_id, date_created } = req.body;
    const newCollaboration = {
      title,
      author,
      lines,
      user_id: req.user.id,
      date_created,
    };

    for (const [key, value] of Object.entries(newCollaboration)) {
      if (value == null) {
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body `,
          },
        });
      }
    }
    CollaborationService.insertCollaboration(
      req.app.get("db"),
      newCollaboration
    )
      .then((collaboration) => {
        res
          .status(201)
          .location(`/collaborations/${collaboration.id}`)
          .json(collaboration);
      })
      .catch(next);
  });
collaborationRouter
  .route("/:collaboration_id")
  .all((req, res, next) => {
    CollaborationService.getById(req.app.get("db"), req.params.collaboration_id)
      .then((collaboration) => {
        if (!collaboration) {
          return res.status(404).json({
            error: { message: "Collaboration doesn't exist" },
          });
        }
        res.collaboration = collaboration;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeCollaboration(res.collaboration));
  })
  .delete((req, res, next) => {
    CollaborationService.deleteCollaboration(
      req.app.get("db"),
      req.params.collaboration_id
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, author, lines, date_created } = req.body;
    const collaborationToUpdate = {
      title,
      author,
      lines,
      date_created,
    };

    const numberOfValues = Object.values(collaborationToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: "Request body must contain  'title', 'author', 'lines' ",
        },
      });
    CollaborationService.updateCollaboration(
      req.app.get("db"),
      req.params.collaboration_id,
      collaborationToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = collaborationRouter;
