const { User } = require("../models/index");

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

  async getUserByEmail(email) {
    try {
      const response = await User.findOne({
        where: { email },
      });
      return response;
    } catch (error) {
      console.error("Database error:", error);
      throw new Error("Database error");
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
