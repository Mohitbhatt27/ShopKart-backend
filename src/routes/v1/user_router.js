const express = require("express");
const Userrouter = express.Router();

const { UserController } = require("../../controllers/index");

const { createUser, getUser, deleteUser } = UserController;

Userrouter.post("/signup", createUser);
Userrouter.get("/:id", getUser);
Userrouter.delete("/:id", deleteUser);

module.exports = Userrouter;
