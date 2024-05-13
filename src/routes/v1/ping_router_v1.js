const express = require("express");
const router = express.Router();

const { V1pingController } = require("../../controllers/ping_controller");

router.get("/", V1pingController);

module.exports = router;
