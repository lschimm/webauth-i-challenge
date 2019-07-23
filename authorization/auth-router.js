const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const helmet = require("helmet");

const Users = require("./auth-model.js");

const router = express.Router();

// GET /api/users
// logged in = array of all users in database
// not logged in = "You shall not pass!~"

// server.get("/", (req, res) => {
//     const { username, password } = req.headers;

//     //find the users in the DB
//     Users.findby({username}).then(user => {
//       //check credentials
//       if (user && bycrpt.compareSync(password, user.password))
//     })
//      .catch(error => {
//       res.status(500).json(error)
//     })
//       .then(users => {
//         res.json(users);
//       })
//       .catch(err => res.send(err));
//   });

router.get("/users", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

// POST /api/login

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res
          .status(200)
          .json({ message: `Welcome ${user.username}? (it works!)` });
      } else {
        res.status(401).json({ message: "invalid credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//POST /api/register
// **hash the password**

router.post("/register", (req, res) => {
  let user = req.body; //this gets the password
  const hash = bcrypt.hashSync(user.password, 8); // 8^2 times of rehashing
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
