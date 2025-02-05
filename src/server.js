import express from 'express';
import mongoose from 'mongoose';
import handlerbars from 'express-handlebars';
import { productsRouter } from './routes/products.routes.js';
import { cartsRouter } from './routes/carts.routes.js';
import { viewsRouter } from './routes/views.routes.js';
import { __dirname } from './dirname.js';
import path from 'path';
import { Server as SocketIOServer } from 'socket.io';
import { productsManager } from './api/mongo/ProductsManager.mongo.js';

const app = express();
const PORT = 8080;

// App configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Public con ruta absoluta
app.use(express.static(path.resolve(__dirname, '../public')));

// Handlebars configuration
// Configuración del motor engine
app.engine(
  "hbs", 
  handlerbars.engine({ 
    defaultLayout: "main",
    extname: ".hbs" 
  })
);

// Cofiguración de la carpeta de vistas
app.set("views", path.resolve(__dirname, "views"));

// Configuración del motor de plantillas
app.set("view engine", "hbs");

// Routes - API endpoints
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Server initialization
const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en //localhost:${PORT}`);
});

// MongoDB connection
mongoose
  .connect("mongodb+srv://gustavo:hola1234@backend76070.iwuij.mongodb.net/mimusica")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB", error);
  });

// Configuración de socket.io
export const io = new SocketIOServer(server);

io.on('connection', async (socket) => {
  console.log('Nuevo cliente conectado:', socket.id);

  const products = await productsManager.getProducts();
  socket.emit('init', products);
})