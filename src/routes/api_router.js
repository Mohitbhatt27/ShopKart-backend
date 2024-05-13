const express = require("express");
const APIrouter = express.Router();

const V1router = require("./v1/index");
const V2router = require("./v2/index");

APIrouter.use("/v1", V1router);
APIrouter.use("/v2", V2router);

module.exports = APIrouter;
