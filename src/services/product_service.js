class ProductService {
  constructor(respository) {
    this.respository = respository;
  }

  async createProduct(product) {
    try {
      const response = await this.respository.createProduct(
        product.title,
        product.description,
        product.price,
        product.image,
        product.categoryId
      );
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async searchProduct(query) {
    try {
      const response = await this.respository.searchProduct(query.q);
      if (!response.length) return "No products found";
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getProducts(query) {
    try {
      if (
        (query.limit && isNaN(+query.limit)) |
        (query.offset && isNaN(+query.offset))
      ) {
        return "NaN";
      }

      if (query.offset) query.offset = +query.offset;
      if (query.limit) query.limit = +query.limit;
      if (query.min_price) query.min_price = +query.min_price;
      if (query.max_price) query.max_price = +query.max_price;

      if (
        query.order &&
        query.order != "asc" &&
        query.order != "desc" &&
        query.order != "ASC" &&
        query.order != "DESC"
      )
        return "Invalid Order";

      const response = await this.respository.getProducts(
        query.limit,
        query.offset,
        query.order,
        query.min_price,
        query.max_price
      );
      return response;
    } catch (error) {
      throw new Error("Error retrieving products");
    }
  }

  async getProduct(id) {
    try {
      const response = await this.respository.getProduct(id);
      return response;
    } catch (error) {
      throw new Error("Error retrieving product");
    }
  }

  async deleteProduct(id) {
    try {
      const response = await this.respository.deleteProduct(id);
      return response;
    } catch (error) {
      throw new Error("Error deleting product");
    }
  }

  async updateProduct(id, title, description, price, image, categoryId) {
    try {
      const response = await this.respository.updateProduct(
        id,
        title,
        description,
        price,
        image,
        categoryId
      );
      // if service has received 0 as response, that means the id is invalid
      if (response == 0) return null;
      return response;
    } catch (error) {
      throw new Error("Error updating product");
    }
  }
}

module.exports = ProductService;
