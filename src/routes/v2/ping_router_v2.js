const express = require("express");
const router = express.Router();

const { V2pingController } = require("../../controllers/ping_controller");

router.get("/", V2pingController);

module.exports = router;
