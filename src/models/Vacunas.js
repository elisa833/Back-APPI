import mongoose from "mongoose";

const VacunaSchema = new mongoose.Schema({
    nombre: { type: "String", required: true },
    fabricante: { type: "String", required: true },
    dosis: { type: "String", required: true },
    url: {type:"string",require:true}
});

export default mongoose.model("Vacunas", VacunaSchema);
