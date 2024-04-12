const db = require("../models");
const AuthClick = db.authClicks;
const Op = db.Sequelize.Op;

// Create and Save a new AuthClick
exports.create = (req, res) => {
  // Validate request
  if (!req.body.macAddress) {
    res.status(400).send({
      message: "Mac address can not be empty!"
    });
    return;
  }

  // Create a AuthClick
  const authClick = {
    macAddress: req.body.macAddress,
    numberOfClick: 1,
  };
  var address = req.body.macAddress;

  AuthClick.findOne({ where: { macAddress: address }, attributes: ['macAddress', 'numberOfClick'] }).then(addr => {
    if (addr == null) {
      AuthClick.create(authClick)
        .then(data => {
          res.send({
            macAddress: data.macAddress,
            numberOfClick: data.numberOfClick
          });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the AuthClick."
          });
        });
    } else {
      // res.send({
      //   "nam": "nam",
      //   addr: addr
      // });
      var numberToClick = addr.numberOfClick + 1;
      if (numberToClick >= 5) {
        numberToClick = 5;
      }
      AuthClick.update({
        numberOfClick: numberToClick,
      }, {
        where: { macAddress: addr.macAddress }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              macAddress: addr.macAddress,
              numberOfClick: numberToClick
            });
          } else {
            res.send({
              message: `Cannot update AuthClick with id=${addr.macAddress}. Maybe AuthClick was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating AuthClick with address=" + addr.macAddress
          });
        });
    };

  })
};
// Retrieve all AuthClicks from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  AuthClick.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving authClicks."
      });
    });
};

// Find a single AuthClick with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AuthClick.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find AuthClick with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving AuthClick with id=" + id
      });
    });
};

// Update a AuthClick by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  AuthClick.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuthClick was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update AuthClick with id=${id}. Maybe AuthClick was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating AuthClick with id=" + id
      });
    });
};

// Delete a AuthClick with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AuthClick.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "AuthClick was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete AuthClick with id=${id}. Maybe AuthClick was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AuthClick with id=" + id
      });
    });
};

// Delete all AuthClicks from the database.
exports.deleteAll = (req, res) => {
  AuthClick.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} AuthClicks were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all authClicks."
      });
    });
};

// find all published AuthClick
exports.findAllPublished = (req, res) => {
  AuthClick.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving authClicks."
      });
    });
};
