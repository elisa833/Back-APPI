import Vacunas from '../models/Vacunas.js'

const consultarVacunas = async (req, res) => {
    try {
        const vacunas = await Vacunas.find();
        res.json(vacunas);  // Devuelvo las vacunas directamente sin necesidad de map()
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const consultar_vacuna = async (req, res) => {
    try {
        const nombreVacuna = req.params.vacuna;
        const vacuna = await Vacunas.findOne({ "nombre": nombreVacuna });
        res.json(vacuna);  // Devuelvo la vacuna directamente
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const insertar_vacuna = async (req, res) => {
    try {
        // Verifica que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });

        const { nombre, fabricante, dosis, url } = req.body;
        const nuevaVacuna = new Vacunas({ nombre, fabricante, dosis, url });
        await nuevaVacuna.save();
        res.status(200).json(nuevaVacuna);  // Devuelvo la vacuna insertada
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const actualizar_vacuna = async (req, res) => {
    try {
        // Verifica que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });

        const { nombre, fabricante, dosis, url } = req.body;
        const vacunaBuscada = req.params.nombre;
        await Vacunas.updateOne(
            { nombre: vacunaBuscada },
            { $set: { nombre, fabricante, dosis, url } }
        );
        res.status(201).json({ "msj": "¡Actualización correcta!" });  // Mensaje de éxito sin transformación
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const eliminar_vacuna = async (req, res) => {
    try {
        // Verifica que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });

        const { nombre } = req.params;
        const resultado = await Vacunas.deleteOne({ nombre: nombre });
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ "msj": "Vacuna no encontrada" });
        }
        res.status(200).json({ "msj": "¡Eliminación correcta!" });  // Mensaje de éxito sin transformación
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

export {consultar_vacuna,insertar_vacuna,actualizar_vacuna,eliminar_vacuna, consultarVacunas};
