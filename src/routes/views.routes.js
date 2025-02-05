import { Router } from "express";
import { productsManager } from "../api/mongo/ProductsManager.mongo.js";

export const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
  const products = await productsManager.getProducts();

  // aquí tenemos el nombre de la plantiila "home" y los datos que le vamos a pasar { }
  res.render("home", {
    title: "Home",
    products
  })
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render("realTimeProducts", {
    title: "Real Time Products"
  })
})