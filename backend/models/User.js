import mongoose from "mongoose";

const direccionSchema = new mongoose.Schema({
  calle: { type: String, required: true },
  numero: { type: String, required: true },
  piso: { type: String, default: "" },
  localidad: { type: String, required: true },
  provincia: { type: String, required: true },
  codigoPostal: { type: String, required: true }
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "cliente" },
  telefono: { type: String, default: "" },
  googleId: { type: String },
  direcciones: { type: [direccionSchema], default: [] },
  resetToken: { type: String },
  resetTokenExpira: { type: Date }
}, { timestamps: true });

export default mongoose.model("User", userSchema);
