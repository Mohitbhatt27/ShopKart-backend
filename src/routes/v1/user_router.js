const express = require("express");
const Userrouter = express.Router();

const { signupValidator } = require("../../middlewares/user_validator");
const { UserController } = require("../../controllers/index");

const { createUser, getUser, deleteUser } = UserController;

Userrouter.post("/signup", signupValidator, createUser);
Userrouter.get("/:id", getUser);
Userrouter.delete("/:id", deleteUser);

module.exports = Userrouter;
