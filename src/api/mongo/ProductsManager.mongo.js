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

  async getProductsPaginated(page, limit, filter) {
    try {
      const options = {
        page: page,
        limit: limit,
        sort: { title: 1 },
      };
      const query = filter ? { category: filter } : {};

      const paginated = await productModel.paginate(query, options);
      return paginated;
    } catch (error) {
      throw new Error(`Error getting products paginated: ${error.message}`);
    }
  }

  async getProductbyId(pid) {
    try {
      const one = await productModel.findById(pid);
      if (!one) {
        throw new Error('Product not found');
      }
      return one;
    } catch (error) {
      throw new Error('Error getting product by id');
    }
  }

  async getProductbyIdToObject(pid) {
    try {
      const one = await productModel.findById(pid);
      if (!one) {
        throw new Error('Product not found');
      }
      // Convertir el documento de Mongoose a un objeto plano
      return one.toObject();
    } catch (error) {
      if (error.message === 'Product not found') {
        throw error;
      }
      throw new Error('Error getting product by id to Object');
    }
  }

  async createProduct(product) {
    try {
      const one = await productModel.create(product);
      return one;
    } catch (error) {
      console.log('createProduct - Error detallado:', error.message);
      throw new Error(`Error creating product: ${error.message}`);
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