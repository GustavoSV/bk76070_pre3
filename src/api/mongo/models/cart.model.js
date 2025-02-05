import { Schema, model } from "mongoose";

const collection = "carts";
const cartSchema = new Schema({
  products: { type: [
    {
      productId: { type: Schema.Types.ObjectId, required: true },
      quantity: { type: Number, required: true },
    },
  ], required: true }, // Array of objects
},
{
  timestamps: true,
});

cartSchema.pre("findOne", function() {
  this.populate("products.productId");
})

export const cartsModel = model(collection, cartSchema);