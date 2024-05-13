const express = require("express");
const V2router = express.Router();

const pingRouter = require("./ping_router_v2");

V2router.use("/ping", pingRouter);

module.exports = V2router;
