module.exports = app => {
  const authClicks = require("../controllers/authClick.controller.js");

  var router = require("express").Router();

  // Create a new AuthClick
  router.post("/", authClicks.create);

  // // Retrieve all AuthClicks
  // router.get("/", authClicks.findAll);

  // // Retrieve all published AuthClicks
  // router.get("/published", authClicks.findAllPublished);

  // // Retrieve a single AuthClick with id
  // router.get("/:id", authClicks.findOne);

  // // Update a AuthClick with id
  // router.put("/:id", authClicks.update);

  // // Delete a AuthClick with id
  // router.delete("/:id", authClicks.delete);

  // // Delete all AuthClicks
  // router.delete("/", authClicks.deleteAll);

  app.use('/api/authClicks', router);
};
