const express = require("express");
const authRouter = require("./authorization/auth-router.js");
const setupGlobalMiddleware = require("./setup-middleware.js");

const server = express();

setupGlobalMiddleware(server);

server.use(express.json());
server.use("/api", authRouter);

module.exports = server;
