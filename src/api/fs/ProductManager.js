import fs from 'node:fs';
import { v4 as uuid } from 'uuid';
import { upload } from '../../middlewares/multer.middleware.js';

class ProductManager {
  path;
  products = [];

  /**
   * 
   * @param { path } path - Ruta del archivo de productos  
   */
  constructor({ path }) {
    this.path = path;

    if (fs.existsSync(this.path)) {
      try {
        this.products = JSON.parse(fs.readFileSync(this.path, 'utf-8'));
      } catch (error) {
        this.products = [];
      }

    } else {
      this.products = [];
    }
  }

  /**
   * 
   * @returns - Retorna todos los productos
   */
  async getProducts() {
    return this.products;
  }

  /**
   * 
   * @param {id} id - Id del producto a buscar   
   * @returns Producto encontrado
   */
  async getProductById({ id }) {
    const product = this.products.find(product => product.id === id);
    return product;
  }

  /**
   * 
   * @param {title, description, code, price, status, category, stock, thumbnails} 
   * title - Título del producto
   * description - Descripción del producto
   * code - Código del producto
   * price - Precio del producto
   * status - Estado del producto
   * category - Categoría del producto
   * stock - Stock del producto
   * thumbnails - Array con Imágenes del producto
   * @returns el producto creado
   */
  async createProduct({ title, description, code, price, status, category, stock, thumbnails }) {
    
    if (!title || !description || !code || !category) {     
      throw new Error('Faltan datos. Debe al menos completar los campos de título, descripción, code, precio, categoria y stock');
    }
    if (isNaN(Number(price)) || isNaN(Number(stock))) {
      throw new Error('El precio y el stock deben ser números');
    }
    
    const id = uuid();
    if (this.products.some(product => product.id === id)) {
      throw new Error('Error interno. Se ha creado 2 veces el mismo pid');
    }

    const product = {
      id,
      title,
      description,
      code,
      price: Number(price),
      status: status || true,
      category,
      stock: Number(stock),
      thumbnails: []
    };

    this.products.push(product);
    try {
      await this.saveOnFile();
      return product;
    } catch (error) {
      throw new Error('Error al guardar el archivo', error);
    }
  }

  /**
   * 
   * @param {id, title, description, code, price, status, category, stock, thumbnails} 
   * id - Id del producto a modificar
   * title - Título del producto
   * description - Descripción del producto
   * code - Código del producto
   * price - Precio del producto
   * status - Estado del producto
   * category - Categoría del producto
   * stock - Stock del producto
   * thumbnails - Array con Imágenes del producto 
   * @returns el producto modificado
   */
  async updateProduct({ id, title, description, code, price, status, category, stock, thumbnails }) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    product.title = title || product.title;
    product.description = description || product.description;
    product.code = code || product.code;
    product.price = price || product.price;
    product.status = status || product.status;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.thumbnails = thumbnails || product.thumbnails;

    const index = this.products.findIndex(product => product.id === id);
    this.products[index] = product;

    try {
      await this.saveOnFile();
      return product;
    } catch (error) {
      console.log('Error al actualizar el archivo', error);
    }
  }

  /**
   * 
   * @param {id} id - Id del producto a eliminar 
   * @returns 
   */
  async deleteProduct({ id }) {
    const product = this.products.find(product => product.id === id);

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const index = this.products.findIndex(product => product.id === id);
    this.products.splice(index, 1);

    try {
      await this.saveOnFile();
      return product;
    } catch (error) {
      console.log('Error al actualizar el archivo', error);
    }
  }

  async saveOnFile() {
    try {
      await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log('Error al guardar el archivo de products', error);
    }
  }
}

export const productManager = new ProductManager({ path: './src/db/products.json' });