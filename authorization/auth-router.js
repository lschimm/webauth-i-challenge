const express = require("express");

const auth = require("./auth-model.js");

const router = express.Router();

// GET /api/users
// logged in = array of all users in database
// not logged in = "You shall not pass!~"

// POST /api/login

//POST /api/register
// **hash the password**

module.exports = router;
