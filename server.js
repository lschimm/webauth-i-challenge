const express = require("express");
const authRouter = require("./authorization/auth-router.js");

const server = express();

server.use(express.json());
server.use("/api/auth", authRouter);

module.exports = server;
