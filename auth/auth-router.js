const route = require("express").Router();
const bcrypt = require("bcryptjs");

const Users = require("../authorization/auth-model.js");

router.post("register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password);
  user.password = hash; //hashes the sucka'

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.username = user.username; // 4) adds data to the session

        res.status(200).json({
          message: `Welcome ${user.username}!`
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get("/logout", (req, res) => {
  if (req.session) {
    // this is the logout information
    req.session.destroy(err => {
      if (err) {
        res.status(500).json({
          message:
            "${user.username} logged out!  (might not actually work. >.>)"
        });
      } else {
        res.status(200).json({ message: "ciao" });
      }
    });
  } else {
    res.status(200).json({ message: "ciao version 2.0" });
  }
});

module.exports = router;
