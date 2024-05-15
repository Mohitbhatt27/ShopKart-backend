const express = require("express");
const router = express.Router();

const { PingController } = require("../../controllers/index");

const { V2pingController } = PingController;

router.get("/", V2pingController);

module.exports = router;
