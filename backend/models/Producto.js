import mongoose from "mongoose";

const opcionVarianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // ej: "Blanco"
  stock: { type: Number, default: 0 }
}, { _id: false });

const varianteSchema = new mongoose.Schema({
  nombre: { type: String, required: true }, // ej: "Color"
  opciones: { type: [opcionVarianteSchema], default: [] }
}, { _id: false });

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  imagen: { type: String, default: "" },
  imagenes: { type: [String], default: [] },
  descripcion: { type: String, default: "" },
  marca: { type: String, default: "" },
  categoria: { type: String, required: true },
  stock: { type: Number, default: 0 }, // para productos sin variantes
  variantes: { type: [varianteSchema], default: [] }
}, { timestamps: true });

export default mongoose.model("Producto", productoSchema);
