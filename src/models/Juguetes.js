import mongoose from "mongoose";

const JuguetesSchema = new mongoose.Schema({
    juguete: { type: String, required: true },
    precio: { type: String, required: true },
    caracteristicas: { type: String, required: true },
    url: {type:"string",require:true}
});

export default mongoose.model("Juguetes", JuguetesSchema);
