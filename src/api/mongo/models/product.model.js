import { Schema, model } from "mongoose";

const collection = "products";
const productSchema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  code: { type: String, required: true },
  price: { type: Number, required: true },
  status: { type: Boolean, required: true },
  category: { type: String, required: true, enum: ["JAZZ", "POP", "ROCK", "ROCK EN ESPAÑOL"] },
  lenguage: { type: String, required: true, enum: ["INGLES", "ESPAÑOL"] },
  type: { type: String, required: true, enum: ["CD", "VINYL", "CASSETTE"] },
  stock: { type: Number, required: true },
  thumbnails: { type: Array, required: true },
},
{
  timestamps: true,
});

export const productModel = model(collection, productSchema);