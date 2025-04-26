import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  rating: {
    type: String,
  },
  size: [String],

  media: [
    {
      type: String,
      require: true,
    },
  ],
  color: [String],
  category: [
    {
      type: String,
      require: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);
export default Product;
