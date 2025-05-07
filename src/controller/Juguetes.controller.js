import Juguetes from '../models/Juguetes.js'

const consultar = async (recibido ,respuesta) => {
    try {
        const juguete = await Juguetes.find();
        respuesta.json(juguete)
    } catch (error) {
        respuesta
        respuesta.status(500).json({"error":error})
    }
}

const consulta_juguete = async (recibido ,respuesta) => {
    try {
        const nombreJuguete = recibido.params.juguete;
        const juguete = await Juguetes.findOne({ "juguete": nombreJuguete });
        respuesta.json(juguete)
    } catch (error) {
        respuesta
        respuesta.status(500).json({"error":error})
    }
}

const insertar_juguete = async (recibido ,respuesta) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});

        const {juguete, precio,caracteristicas,url} = recibido.body;//enviar datos por metodo POST
        const jugueteNuevo = new Juguetes({ "juguete": juguete, "precio": precio, "caracteristicas": caracteristicas, "url":url});
        jugueteNuevo.save();
        respuesta.status(200).json(jugueteNuevo)
    } catch (error) {
        respuesta
        respuesta.status(500).json({"error":error})
    }
}

const actualizar_juguete = async (recibido ,respuesta) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});

        const {juguete, precio,caracteristicas,url} = recibido.body;
        let user = recibido.params.juguete
        await Juguetes.updateOne({ "juguete": user }, { $set: { "juguete": juguete, "precio": precio, "caracteristicas": caracteristicas, "url":url} });
        respuesta.status(201).json({"msj":"Actualizacion correcta!"})
    } catch (error) {
        respuesta.status(500).json({"error":error})
    }
}

const eliminar_juguete = async (recibido, respuesta) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});
        
        const {juguete} = recibido.params;
        const resultado = await Juguetes.deleteOne({"juguete":juguete});
        if (resultado.deletedCount === 0) {
            return respuesta.status(404).json({ "msj": "Juguete no encontrado" });
        }
        respuesta.status(200).json({ "msj": "Eliminación correcta!" });
    } catch (error) {
        respuesta.status(500).json({ "error": error });
    }
};


export {consulta_juguete, consultar,insertar_juguete,actualizar_juguete, eliminar_juguete};