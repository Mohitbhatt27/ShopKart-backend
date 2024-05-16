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
