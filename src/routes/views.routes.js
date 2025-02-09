import { Router } from "express";
import { productsManager } from "../api/mongo/ProductsManager.mongo.js";
import { cartsManager } from "../api/mongo/CartsManager.mongo.js";

export const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  const products = await productsManager.getProducts();

  // aquí tenemos el nombre de la plantiila "home" y los datos que le vamos a pasar { }
  res.render("home", {
    title: "Home",
    products
  })
});

viewsRouter.get('/products/:pid', async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productsManager.getProductbyIdToObject(pid);

    res.render("productDetail", { product });
  } catch (error) {
    if (error.message === 'Product not found') {
      return res.status(404).render("error", { 
        error: "Producto no encontrado" 
      });
    }

    res.status(500).render("error", { error: `Error al cargar el producto: ${error.message}` });
  }
});

viewsRouter.get('/carts/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartsManager.getCartById(cid);

    res.render("cart", { cart });
  } catch (error) {
    res.status(500).render("error", { error: `Error al cargar el carrito: ${error.message}` });
  }
})

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render("realTimeProducts", {
    title: "Real Time Products"
  })
})