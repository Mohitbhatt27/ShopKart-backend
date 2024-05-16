const { User } = require("../models/index");
const { Sequelize } = require("sequelize"); //only to check for duplicate email

class UserRepository {
  async createUser(username, password, email) {
    try {
      const response = await User.create({
        username,
        password,
        email,
      });
      return response;
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        throw new Error("Email must be unique");
      } else if (error.name === "SequelizeValidationError") {
        if (error.errors[0].type === "notNull Violation") {
          throw new Error("Empty required fields");
        }
        const errorpath = error.errors[0].path;
        if (errorpath === "email") {
          throw new Error("Invalid email address");
        } else if (errorpath === "password") {
          throw new Error("Invalid password");
        }
      } else {
        console.error("Database error:", error);
        throw new Error("Database error");
      }
    }
  }

  async getUser(id) {
    try {
      const response = await User.findByPk(id);
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }

  async deleteUser(id) {
    try {
      const response = User.destroy({
        where: { id },
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
    }
  }
}

module.exports = UserRepository;
