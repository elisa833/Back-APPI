import Juguetes from '../models/Juguetes.js'

// CONSULTAR TODOS LOS JUGUETES
const consultar = async (req, res) => {
    try {
        const juguetes = await Juguetes.find();
        res.json(juguetes);
    } catch (error) {
        res.status(500).json({ error });
    }
};

// CONSULTAR JUGUETE POR NOMBRE
const consulta_juguete = async (req, res) => {
    try {
        const nombreJuguete = req.params.juguete;
        const juguete = await Juguetes.findOne({ juguete: nombreJuguete });
        res.json(juguete);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const insertar_juguete = async (req, res) => {
  try {
    const { juguete, precio, caracteristicas, url } = req.body;
    if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });
    const jugueteNuevo = new Juguetes({ juguete, precio, caracteristicas, url });
    await jugueteNuevo.save();
    res.status(200).json(jugueteNuevo);
  } catch (error) {
    console.log('Error al insertar juguete:', error);
    res.status(500).json({ error: error.message });
  }
};

const actualizar_juguete = async (req, res) => {
  try {
    const { juguete, precio, caracteristicas, url } = req.body;
    if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });
    const nombreJuguete = req.params.juguete;
    await Juguetes.updateOne(
      { juguete: nombreJuguete },
      { $set: { juguete, precio, caracteristicas, url } }
    );
    res.status(200).json({ msj: "Actualización correcta" });
  } catch (error) {
    console.log('Error al actualizar juguete:', error);
    res.status(500).json({ error: error.message });
  }
};

const eliminar_juguete = async (req, res) => {
  try {
    if (res.user.rol !== 1) return res.status(403).json({ "msj": "Sin permisos para efectuar acción" });
    const { juguete } = req.params;
    const resultado = await Juguetes.deleteOne({ juguete });
    if (resultado.deletedCount === 0) {
      return res.status(404).json({ msj: "Juguete no encontrado" });
    }
    res.status(200).json({ msj: "Eliminación correcta" });
  } catch (error) {
    console.log('Error al eliminar juguete:', error);
    res.status(500).json({ error: error.message });
  }
};


export {
    consultar, consulta_juguete,insertar_juguete, actualizar_juguete, eliminar_juguete
};