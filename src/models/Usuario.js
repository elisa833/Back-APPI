import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: Number, required: true },
    estado: { type: Number, default: 0 }
});

export default mongoose.model("Usuario", UsuarioSchema);
