import { Router } from "express";
import { productsManager } from "../api/mongo/ProductsManager.mongo.js";
import { io } from '../server.js';

export const productsRouter = Router();

// GET /api/products
productsRouter.get('/', async (req, res) => {
  // const products = await productsManager.getProducts();
  // res.status(200).json(products);
  const { page = 1, limit = 6, category = '' } = req.query;
  
  const products = await productsManager.getProductsPaginated(page, limit, category);
  res.status(200).json({
    data: products.docs,
    totalPages: products.totalPages,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
    page: products.page,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage
  });
});

// GET /api/products/:pid
productsRouter.get('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productsManager.getProductbyId(pid);
  if (!product) {
    throw new Error('Producto no encontrado' );
  }
  res.status(200).json(product);
});

// POST /api/products
productsRouter.post('/', async (req, res) => {
  const product = req.body;
  try {
    const newProduct = await productsManager.createProduct(product);
    // Emitir el evento 'new-product' a todos los clientes conectados
    io.emit('new-product', newProduct);
    
    res.status(201).json({ status: 'success', data: newProduct });
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor - productsRouter.POST: ${error.message}` }); 
  }
});

// PUT /api/products/:pid
productsRouter.put('/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = req.body;

  try {
    const updProduct = await productsManager.updateProduct( pid, product );
    res.status(200).json({ status: 'success', data: updProduct })
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor - productsRouter.PUT: ${error.message}` }); 
  }
});

// DELETE /api/products/:pid
productsRouter.delete('/:pid', async (req, res) => {
  const pid = req.params.pid;

  try {
    const product = await productsManager.deleteProduct(pid);
    res.status(200).json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ message: `Error interno del servidor - productsRouter.DELETE: ${error.message}` }); 
  }
});