import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    usuario: { type: String, required: true },
    password: { type: String, required: true },
    rol: { type: String, required: true },
    estado: { type: String, required: true }
});

export default mongoose.model("Usuario", UsuarioSchema);
