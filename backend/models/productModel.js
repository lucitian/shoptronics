import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    console: [{ type: String, required: true }],
    image: { type: String, required: true },
    price: { type: Number, required: true },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    stock: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model('Product', productSchema);

export default Product