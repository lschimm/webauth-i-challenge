const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session"); // 1) install session (npm i express-session)
const KnexSessionStore = require("connect-session-knex")(session); // GOTCHA: pass in the session // npm i connect-session-knex

module.exports = server => {
  // 2) Create config object
  const sessionConfig = {
    name: "azeroth", // defaults to sid
    secret: process.env.SESSION_SECRET || "keep it secret, keep it safe!", // to encrypt/decrypt the cookie
    cookie: {
      maxAge: 1000 * 60 * 10, // 10 minutes (counted in milliseconds)
      secure: false, // true in production, only sends cookie over https
      httpOnly: true // JS can't access the cookie on the client
    },
    resave: false, // saves the session again even if it didn't change
    saveUninitialized: true,
    // GOTCHA: remember "new"
    store: new KnexSessionStore({
      knex: require("./data/db-config.js"),
      tablename: "sessions",
      createtable: true,
      sidfieldname: "sid",
      clearInterval: 1000 * 60 * 60 // deletes expired sessions every hour
    })
  };

  server.use(helmet());
  server.use(express.json());
  server.use(cors());
  server.use(session(sessionConfig)); // 3) turn sessions on
};
