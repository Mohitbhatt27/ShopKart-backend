const express = require("express");
const Userrouter = express.Router();

const { signupValidator } = require("../../middlewares/user_middleware");
const { UserController } = require("../../controllers/index");

const { createUser, getUser, deleteUser, signinUser } = UserController;

Userrouter.post("/signup", signupValidator, createUser);
Userrouter.post("/signin", signupValidator, signinUser);
Userrouter.get("/:id", getUser);
Userrouter.delete("/:id", deleteUser);

module.exports = Userrouter;
