const bcrypt = require("bcrypt");
const { generateJWT } = require("../utils/auth");

class UserService {
  constructor(respository, cartRepository) {
    this.respository = respository;
    this.cartRepository = cartRepository;
  }

  async createUser(category) {
    try {
      const response = await this.respository.createUser(
        category.username,
        category.password,
        category.email
      );
      const cart = await this.cartRepository.createCart(response.id);
      response.cart = cart;
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

      return generateJWT({ id: user.id, email: user.email });
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
