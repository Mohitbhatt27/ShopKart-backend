const express = require("express");
const router = express.Router();

const { PingController } = require("../../controllers/index");
const { isLoggedIn } = require("../../middlewares/auth_middleware");

const { V2pingController } = PingController;

router.get("/", isLoggedIn, V2pingController);

module.exports = router;
