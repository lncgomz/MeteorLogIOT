const db = require("../models");
const MeteorLog = db.meteorlog;
const Op = db.Sequelize.Op;

// Create and Save a new Log
exports.create = (req, res) => {
    // Validate request
    if (!req.body.deviceId) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Log
    const meteorlog = {
      deviceId: req.body.deviceId,
      temperature: req.body.temperature,
      humidity: req.body.humidity
    };
  
    // Save Log in the database
    MeteorLog.create(meteorlog)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Log."
        });
      });
  };

// Retrieve all Logs from the database.
exports.findAll = (req, res) => {
    const deviceId = req.query.deviceId;
    var condition = deviceId ? { deviceId: { [Op.like]: `%${deviceId}%` } } : null;
  
    MeteorLog.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logs."
        });
      });
  };

// Find a single Log with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    MeteorLog.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Log with id=" + id
        });
      });
  };

// Update a Log by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    MeteorLog.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Log was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Log with id=${id}. Log was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Log with id=" + id
        });
      });
  };

// Delete a Log with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    MeteorLog.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Log was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Log with id=${id}. Log was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Log with id=" + id
        });
      });
  };

// Delete all Logs from the database.
exports.deleteAll = (req, res) => {
    MeteorLog.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Logs were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all logs."
        });
      });
  };

// Find all published Logs
exports.findAllPublished = (req, res) => {
    MeteorLog.findAll({ where: { published: true } })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving logs."
        });
      });
  };