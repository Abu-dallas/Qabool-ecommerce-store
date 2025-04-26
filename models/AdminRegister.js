import mongoose from "mongoose";

const AdminRegisterSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  media: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const AdminRegister =
  mongoose.models.AdminRegister ||
  mongoose.model("AdminRegister", AdminRegisterSchema);
export default AdminRegister;
