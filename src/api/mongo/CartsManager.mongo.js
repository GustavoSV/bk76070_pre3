import { cartsModel } from './models/cart.model.js';

class CartsManager {
  async getCarts() {
    try {
      const all = await cartsModel.find();
      return all;
    } catch (error) {
      throw new Error('Error getting carts');
    }
  }

  async getCardbYId(cid) {
    try {
      const one = await cartsModel.findById(cid);
      return one;
    } catch (error) {
      throw new Error('Error getting cart by id');
    }
  }

  async createCart({products}) {
    try {
      const cart = await cartsModel.create({products});
      return cart;
    } catch (error) {
      throw new Error('Error creating cart');
    }
  }

  async addProductToCart({cid, pid, quantity}) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      const product = cart.products.find(product => product.productId === pid);
      if (product) {
        product.quantity += quantity;
      } else {
        cart.products.push({productId: pid, quantity});
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error('Error adding product to cart');
    }
  }

  async deleteProductFromCart({cid, pid}) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      cart.products = cart.products.filter(product => product.productId !== pid);
      if (cart.products.lenght === 0) {
        await cartsModel.findByIdAndDelete(cid);
        return null;}
      else {
        await cart.save();
        return cart;
      }
    } catch (error) {
      throw new Error('Error deleting product from cart');
    }
  }
}

export const cartsManager = new CartsManager();