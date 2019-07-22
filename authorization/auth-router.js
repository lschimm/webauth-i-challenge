const express = require("express");

const auth = require("./auth-model.js");

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

//POST /api/register
// **hash the password**

module.exports = router;
