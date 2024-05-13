const { default: axios } = require("axios");

class FakeStoreRepository {
  async getAllProducts() {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      return response.data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }

  async getProduct(id) {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      return response.data;
    } catch (error) {
      console.log("Something went wrong", error);
    }
  }
}

module.exports = FakeStoreRepository;
