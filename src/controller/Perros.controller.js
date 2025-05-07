import Perros from '../models/Perros.js'

const consulta = async (recibido ,respuesta) => {

    try {

        const raza = await Perros.find();
        respuesta.json(raza);
    } catch (error) {
        respuesta
        respuesta.status(500).json({"error":error});
    }
}

const consulta_individual = async (recibido ,respuesta) => {
    try {
        let raza = recibido.params.raza;
        const perros = await Perros.findOne({"raza":raza});
        respuesta.json(perros);
    } catch (error) {
        respuesta
        respuesta.status(500).json({"error":error});
    }
}

const insercion = async (recibido ,respuesta) => {
    try {
        const {raza, medida,altura,vida,url} = recibido.body;//enviar datos por metodo POST
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});

        if (raza == "" || medida == "" || vida == "" || url ==""){
            respuesta.json({"msj":"Campos vacios por llenar"})
        } else {
            const perroNuevo = new Perros({"raza":raza, "medida":medida, "altura":altura, "vida":vida, "url":url});
            perroNuevo.save();
            respuesta.status(200).json(perroNuevo);
        }
    } catch (error) {
        respuesta.status(500).json({"error":error});
    }
}

const actualizacion = async (recibido ,respuesta) => {
    try {

        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});
        
        const {raza,medida,altura,vida,url} = recibido.body;
        let user = recibido.params.raza;
        await Perros.updateOne({"raza":user}, {$set:{"raza":raza,"medida":medida,"altura":altura,"vida":vida,"url":url}});
        respuesta.status(201).json({"msj":"Actualizacion correcta!"});
    } catch (error) {
        respuesta.status(500).json({"error":error});
    }
}

const eliminacion = async (recibido, respuesta) => {
    try {
        const {raza} = recibido.params;
        
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});
        const resultado = await Perros.deleteOne({"raza":raza});
        if (resultado.deletedCount === 0) {
            return respuesta.status(404).json({ "msj": "Perro no encontrado" });
        }
        respuesta.status(200).json({ "msj": "Eliminación correcta!" });
    } catch (error) {
        respuesta.status(500).json({ "error": error });
    }
};


export {consulta, consulta_individual,insercion,actualizacion,eliminacion};