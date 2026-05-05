import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  productoId: {
    type: String,
    required: true
  },
  usuarioId: {
    type: String,
    required: true
  },
  nombreUsuario: {
    type: String,
    required: true
  },
  estrellas: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comentario: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Resena", resenaSchema);