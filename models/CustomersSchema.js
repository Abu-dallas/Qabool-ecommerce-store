import mongoose from "mongoose";

const customersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

const Customers =
  mongoose.models.Customers || mongoose.model("Customers", customersSchema);
export default Customers;
