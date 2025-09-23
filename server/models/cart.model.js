import { Schema, model } from 'mongoose'



const cartItemSchema = new Schema({
   product: {
    type:Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "A product is required"]
  },
  quantity: {
    type: Number,
    required: [true, "Quantity is required"],
    min: [1, "Quantity must be at least 1"]
  }
});

const cartSchema = new Schema(
  {
  items: [cartItemSchema]
  },
  {timestamps: true} 
);


export default model('Cart', cartSchema)
