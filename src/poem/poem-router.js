const path = require("path");
const express = require("express");
const xss = require("xss");
const PoemService = require("./poem-service");
const poemRouter = express.Router();
const { requireAuth } = require("../middleware/jwt-auth");
const jsonParser = express.json();

const serializePoem = (poem) => ({
  id: poem.id,
  title: xss(poem.title),
  author: xss(poem.author),
  lines: xss(poem.lines),
  user_id: poem.user_id,
  date_created: poem.date,
});

poemRouter
  .route("/")
  .all(requireAuth)
  .get((req, res, next) => {
    // const knexInstance = req.app.get("db", req.user.id);
    PoemService.getAllPoems(req.app.get("db"), req.user.id)
      .then((poem) => {
        res.json(poem.map(serializePoem));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, author, lines, user_id, date_created } = req.body;
    const newPoem = {
      title,
      author,
      lines,
      user_id: req.user.id,
      date_created,
    };

    for (const [key, value] of Object.entries(newPoem)) {
      if (value == null) {
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body `,
          },
        });
      }
    }
    PoemService.insertPoem(req.app.get("db"), newPoem)
      .then((poem) => {
        res.status(201).location(`/poems/${poem.id}`).json(poem);
      })
      .catch(next);
  });
poemRouter
  .route("/:poem_id")
  .all((req, res, next) => {
    PoemService.getById(req.app.get("db"), req.params.poem_id)
      .then((poem) => {
        if (!poem) {
          return res.status(404).json({
            error: { message: "Poem doesn't exist" },
          });
        }
        res.poem = poem;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializePoem(res.poem));
  })
  .delete((req, res, next) => {
    PoemService.deletePoem(req.app.get("db"), req.params.poem_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, author, lines, date_created } = req.body;
    const poemToUpdate = {
      title,
      author,
      lines,
      date_created,
    };

    const numberOfValues = Object.values(poemToUpdate).filter(Boolean).length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: "Request body must contain  'title', 'author', 'lines' ",
        },
      });
    PoemService.updatePoem(req.app.get("db"), req.params.poem_id, poemToUpdate)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = poemRouter;
