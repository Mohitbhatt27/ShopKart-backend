const bcrypt = require("bcrypt");

class UserService {
  constructor(respository) {
    this.respository = respository;
  }

  async createUser(category) {
    try {
      const response = await this.respository.createUser(
        category.username,
        category.password,
        category.email
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async signinUser(email, password) {
    try {
      const user = await this.respository.getUserByEmail(email);
      if (!user) throw new Error("User not found");

      const isPasswordValid = await bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) throw new Error("Invalid credentials");
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getUser(id) {
    try {
      const response = await this.respository.getUser(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteUser(id) {
    try {
      const response = await this.respository.deleteUser(id);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = UserService;
