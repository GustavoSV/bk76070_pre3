import mongoose from 'mongoose';
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

  async getCartById(cid) {
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
      throw new Error(`Error creating cart: ${error.message}`);
    }
  }

  async addProductToCart({cid, pid, quantity}) {
    try {
      // Convertimos pid a ObjectId para poder hacer la comparación
      const objectIdPid = new mongoose.Types.ObjectId(pid);

      // Buscar y actualizar en dos operaciones *************
      // const cart = await cartsModel.findById(cid);
      // if (!cart) {
      //   throw new Error('Cart not found');
      // }
      // // Usamos equals() para comparar ObjectIds
      // const product = cart.products.find(product => product.productId.equals(objectIdPid));
      // if (product) {
      //   product.quantity += quantity;
      // } else {
      //   cart.products.push({productId: objectIdPid, quantity});
      // }
      // await cart.save();

      // Buscar y actualizar en una sola operación *************
      const cart = await cartsModel.findOneAndUpdate(
        { _id: cid, "products.productId": objectIdPid },
        { $inc: { "products.$.quantity": quantity } },
        { new: true }
      );
      // Si no encontró el producto en el carrito, lo agregamos
      if (!cart) {
        const cart = await cartsModel.findByIdAndUpdate(
          cid,
          { $push: { products: { productId: objectIdPid, quantity } } },
          { new: true }
        );
        if (!cart) {
          throw new Error('Cart not found');
        }
        return cart;
      }
      // return cart;
    } catch (error) {
      throw new Error(`Error adding product to cart: ${error.message}`);
    }
  }

  async deleteProductFromCart({cid, pid, quantity = 1}) {
    try {
      // Convertimos pid a ObjectId para poder hacer la comparación
      const objectIdPid = new mongoose.Types.ObjectId(pid);

      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error('Cart not found');
      }

      // Buscamos el producto en el carrito
      const productIndex = cart.products.findIndex(product => 
        product.productId.equals(objectIdPid)
      );

      if (productIndex === -1) {
        throw new Error('Product not found in cart');
      }

      // Restamos la cantidad
      cart.products[productIndex].quantity -= quantity;

      // Si la cantidad es menor o igual a 0, eliminamos el producto
      if (cart.products[productIndex].quantity <= 0) {
        cart.products.splice(productIndex, 1);
      }

      // Si el carrito queda sin productos, lo eliminamos
      if (cart.products.length === 0) {
        await cartsModel.findByIdAndDelete(cid);
        return null;
      }

      // Si todavía hay productos, guardamos el carrito actualizado
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(`Error deleting product from cart: ${error.message}`);
    }
  }

  async deleteCart(cid) {
    try {
      const cart = await cartsModel.findById(cid);
      if (!cart) {
        throw new Error('Cart not found');
      }
      await cartsModel.findByIdAndDelete(cid);
      return cart;
    } catch (error) {
      throw new Error(`Error deleting cart: ${error.message}`);
    }
  }
}

export const cartsManager = new CartsManager();