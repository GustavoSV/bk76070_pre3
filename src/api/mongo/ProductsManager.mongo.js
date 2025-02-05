import { productModel } from "./models/product.model.js";

class ProductsManager {
  async getProducts() {
    try {
      const all = await productModel.find();
      return all;
    } catch (error) {
      throw new Error('Error getting products');
    }
  }

  async getProductbyId(pid) {
    try {
      const one = await productModel.findById(pid);
      return one;
    } catch (error) {
      throw new Error('Error getting product by id');
    }
  }

  async createProduct(product) {
    try {
      const one = await productModel.create(product);
      return one;
    } catch (error) {
      throw new Error('Error creating product');
    }
  }

  async updateProduct(pid, product) {
    try {
      const one = await productModel.findByIdAndUpdate(pid, product, { new: true });
      return one;
    } catch (error) {
      throw new Error('Error updating product');
    }
  }

  async deleteProduct(pid) {
    try {
      const one = await productModel.findByIdAndDelete(pid);
      return one;
    } catch (error) {
      throw new Error('Error deleting product');
    }
  }
}

export const productsManager = new ProductsManager();