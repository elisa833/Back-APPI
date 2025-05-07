import Vacunas from '../models/Vacunas.js'

const consultarVacunas = async (req, res) => {
    try {
        const vacunas = await Vacunas.find();
        res.json(vacunas);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const consultar_vacuna = async (req, res) => {
    try {
        const nombreVacuna = req.params.vacuna;
        const vacuna = await Vacunas.findOne({ "nombre": nombreVacuna });
        res.json(vacuna);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const insertar_vacuna = async (req, res) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});

        const { nombre, fabricante, dosis,url } = req.body;
        const nuevaVacuna = new Vacunas({ nombre, fabricante, dosis, url});
        await nuevaVacuna.save();
        res.status(200).json(nuevaVacuna);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const actualizar_vacuna = async (req, res) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});

        const { nombre, fabricante, dosis,url } = req.body;
        const vacunaBuscada = req.params.vacuna;
        await Vacunas.updateOne(
            { nombre: vacunaBuscada },
            { $set: { nombre, fabricante, dosis, url} }
        );
        res.status(201).json({ "msj": "¡Actualización correcta!" });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const eliminar_vacuna = async (req, res) => {
    try {
        if(respuesta.user.rol !== '1' ) return respuesta.status(403).json({"msj":"Sin permisos para efectuar accion"});
        
        const { vacuna } = req.params;
        const resultado = await Vacunas.deleteOne({ nombre: vacuna });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ "msj": "Vacuna no encontrada" });
        }
        res.status(200).json({ "msj": "¡Eliminación correcta!" });
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

export {consultar_vacuna,insertar_vacuna,actualizar_vacuna,eliminar_vacuna, consultarVacunas};
