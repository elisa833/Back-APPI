import mongoose from "mongoose";

const PerrosModelo = new mongoose.Schema({
    
    raza:{type:"String",require:true},
    medida:{type:"String",require:true},
    altura:{type:"String",require:true},
    vida:{type:"String",require:true},
    url: {type:"string",require:true}
});

//identificador fuera del archivo, instancia de clase apartir de schema
export default mongoose.model('Perros',PerrosModelo);