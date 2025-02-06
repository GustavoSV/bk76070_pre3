import { Schema, model } from "mongoose";

const collection = "carts";
const cartSchema = new Schema({
  products: { type: [
    {
      productId: { 
        type: Schema.Types.ObjectId, 
        ref: 'products',  // línea con el nombre de la colección de productos
        required: true 
      },
      quantity: { type: Number, required: true },
    },
  ], required: true }, // Array of objects
},
{
  timestamps: true,
});

cartSchema.pre([ "findOne", "find" ], function() {
  this.populate("products.productId");
})

export const cartsModel = model(collection, cartSchema);