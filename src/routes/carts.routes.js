import { Router } from "express";
import { cartsManager } from "../api/mongo/CartsManager.mongo.js";

export const cartsRouter = Router();

// GET /api/carts
cartsRouter.get('/', async (req, res) => {
  const carts = await cartsManager.getCarts();
  res.status(200).json(carts);
});

// GET /api/carts
cartsRouter.get('/:cid', async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartsManager.getCartById(cid);
  if (!cart) {
    return res.status(404).json({ message: 'Carrito no encontrado' });
  }
  res.status(200).json(cart);
});

// POST /api/carts
cartsRouter.post('/', async (req, res) => {
  const { products } = req.body;

  if (Array.isArray(products) && products.length === 0) {
    return res.status(400).json({ message: 'El carrito debe tener al menos un producto' });
  }

  try {
    const newCart = await cartsManager.createCart({ products });
    res.status(201).json({ status: 'success', data: newCart });
  } catch (error) {
    res.status(500).json({ message: 'Error interno del servidor', error });
  }
});

// Adicionar un producto a un carrito
// POST /api/carts/:cid/products/:pid
cartsRouter.post('/:cid/products/:pid', async (req, res) => {
  // const cid = req.params.cid;
  // const pid = req.params.pid;
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartsManager.addProductToCart({ cid, pid, quantity });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor ${ error.message }` });
  }
});

// Eliminar un producto de un carrito
// DELETE /api/carts/:cid/products/:pid
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;
  try {
    const cart = await cartsManager.deleteProductFromCart({ cid, pid, quantity });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor ${ error.message }` });
  }
});

// DELETE /api/carts/:cid
cartsRouter.delete('/:cid', async (req, res) => {
  const cid = req.params.cid;
  try {
    const cart = await cartsManager.deleteCart(cid);
    res.status(200).json({ status: 'success', data: cart });
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor ${ error.message }` });
  }
});