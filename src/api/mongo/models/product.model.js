import { Schema, model } from "mongoose";
import mongoosepaginate from "mongoose-paginate-v2";

const collection = "products";
const productSchema = new Schema({
  // name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true, enum: ["JAZZ", "POP", "ROCK", "ROCK EN ESPAÑOL"] },
  lenguage: { type: String, required: true, enum: ["INGLES", "ESPAÑOL"] },
  price: { type: Number, required: true },
  status: { type: Boolean, default: true },
  stock: { type: Number, required: true, default: 0 },
  type: { type: String, required: true, enum: ["CD", "VINILO", "CASSETTE"] },
  thumbnails: { type: Array },
},
{
  timestamps: true,
});
// esto es para paginar, agrega los metodos paginate y paginateAggregate a los modelos
productSchema.plugin(mongoosepaginate);

export const productModel = model(collection, productSchema);