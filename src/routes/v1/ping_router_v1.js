const express = require("express");
const router = express.Router();

const { PingController } = require("../../controllers/index");

const { V1pingController } = PingController;

router.get("/", V1pingController);

module.exports = router;
