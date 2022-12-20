module.exports = app => {
    const meteorlogs = require("../controllers/meteorlog.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Log
    router.post("/", meteorlogs.create);
  
    // Retrieve all Logs
    router.get("/", meteorlogs.findAll);
  
    // Delete all Logs
    router.delete("/", meteorlogs.deleteAll);
  
    app.use('/api/meteorlogs', router);
  };