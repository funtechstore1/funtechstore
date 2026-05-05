import mongoose from "mongoose";

const pedidoSchema = new mongoose.Schema({
  email: String,
  nombre: String,
  items: Array,
  external_reference: String,
  paymentId: String,
  estado: {
    type: String,
    default: "pendiente"
  }
}, { timestamps: true });

export default mongoose.model("Pedido", pedidoSchema);