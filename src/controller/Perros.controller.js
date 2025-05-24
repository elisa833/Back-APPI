import Perros from '../models/Perros.js'

const consulta = async (req, res) => {
    try {
        const perros = await Perros.find();
        res.json(perros);  // Devuelvo los perros directamente sin necesidad de map()
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const consulta_individual = async (req, res) => {
    try {
        const nombrePerro = req.params.raza;
        const perro = await Perros.findOne({ "raza": nombrePerro });
        res.json(perro);  // Devuelvo el perro directamente
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const insercion = async (req, res) => {
    try {
        // Asegúrate de que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });

        const { raza, medida, vida,altura, url } = req.body;
        const nuevoPerro = new Perros({ raza, medida, vida,altura, url });
        await nuevoPerro.save();
        res.status(200).json({"msj": "Perro agregado correctamente"});  // Devuelvo el perro insertado
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const actualizacion = async (req, res) => {
    try {
        // Asegúrate de que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });

        const { raza, medida, vida,altura, url } = req.body;
        const perroBuscado = req.params.perro;
        await Perros.updateOne(
            { nombre: perroBuscado },
            { $set: { raza, medida, vida,altura, url  } }
        );
        res.status(201).json({ "msj": "¡Actualización correcta!" });  // Mensaje de éxito sin transformación
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const eliminacion = async (req, res) => {
    try {
        // Asegúrate de que el usuario esté autenticado y tenga el rol correcto
        if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });
        
        const { raza } = req.params;
        const resultado = await Perros.deleteOne({"raza":raza});
        if (resultado.deletedCount === 0) {
            return res.status(404).json({ "msj": "Perro no encontrado" });
        }
        res.status(200).json({ "msj": "¡Eliminación correcta!" });  // Mensaje de éxito sin transformación
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

export {consulta, consulta_individual,insercion,actualizacion,eliminacion};