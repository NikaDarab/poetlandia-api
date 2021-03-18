const path = require("path");
const express = require("express");
const xss = require("xss");
const LibraryService = require("./library-service");
const libraryRouter = express.Router();
const jsonParser = express.json();

const serializeLibrary = (library) => ({
  id: library.id,
  title: xss(library.title),
  author: xss(library.author),
  lines: xss(library.lines),
});

libraryRouter
  .route("/")
  .get((req, res, next) => {
    const knexInstance = req.app.get("db");
    LibraryService.getAllLibraries(knexInstance)
      .then((library) => {
        res.json(library.map(serializeLibrary));
      })
      .catch(next);
  })
  .post(jsonParser, (req, res, next) => {
    const { title, author, lines } = req.body;
    const newLibrary = {
      title,
      author,
      lines,
    };

    for (const [key, value] of Object.entries(newLibrary)) {
      if (value == null) {
        return res.status(400).json({
          error: {
            message: `Missing '${key}' in request body `,
          },
        });
      }
    }
    LibraryService.insertLibrary(req.app.get("db"), newLibrary)
      .then((library) => {
        res.status(201).location(`/library/${library.id}`).json(library);
      })
      .catch(next);
  });
libraryRouter
  .route("/:library_id")
  .all((req, res, next) => {
    LibraryService.getById(req.app.get("db"), req.params.library_id)
      .then((library) => {
        if (!library) {
          return res.status(404).json({
            error: { message: "library doesn't exist" },
          });
        }
        res.library = library;
        next();
      })
      .catch(next);
  })
  .get((req, res, next) => {
    res.json(serializeLibrary(res.library));
  })
  .delete((req, res, next) => {
    LibraryService.deleteLibrary(req.app.get("db"), req.params.library_id)
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(jsonParser, (req, res, next) => {
    const { title, author, lines } = req.body;
    const libraryToUpdate = {
      title,
      author,
      lines,
    };

    const numberOfValues = Object.values(libraryToUpdate).filter(Boolean)
      .length;
    if (numberOfValues === 0)
      return res.status(400).json({
        error: {
          message: "Request body must contain  'title', 'author', 'lines' ",
        },
      });
    LibraryService.updateLibrary(
      req.app.get("db"),
      req.params.library_id,
      libraryToUpdate
    )
      .then((numRowsAffected) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = libraryRouter;
