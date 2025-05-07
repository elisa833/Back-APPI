import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const registro_usuario = async (recibido,respuesta) => {
    try {
        const {usuario, password,rol} = recibido.body;
        const cifrado = await bcrypt.hash(password,10);
        const registro = new Usuario({"usuario":usuario,"password":cifrado,"rol":rol,"estado":0});
        await registro.save();
        respuesta.status(201).json({"msj":"Usuario registrado","registro":registro})
    } catch (error) {
        respuesta.status(500).json({"msj":error})
    }
}

const iniciar_sesion = async (recibido,respuesta) => {
    try {
        const {usuario,password} = recibido.body;
        const consultaUsuario = await Usuario.findOne({"usuario":usuario});
        if (!consultaUsuario) return respuesta.status(500).json({"msj":`El usuario ${usuario} no esta registrado`});

        let comparacion = await bcrypt.compare(password,consultaUsuario.password);

        if (!comparacion) return respuesta.status(500).json({"msj":"Credenciales de acceso invalidas!!!"})
        
        const token = jwt.sign({
            id:consultaUsuario._id, 
            "rol":consultaUsuario.rol
        }, 
            process.env.JWT_SECRET, {"expiresIn":"1hr"}
        );

        respuesta.status(201).json({"msj":"Inicio de sesion exitoso!","token":token})
    } catch (error) {
        respuesta.status(500).json({"msj":error})
    }
}

const consultarUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const consultar_usuario = async (req, res) => {
    try {
        const nombreUsuario = req.params.usuario;
        const usuario = await Usuario.findOne({ "usuario": nombreUsuario });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ "error": error });
    }
};

const insertar_usuario = async (req, res) => {
    try {
        const { usuario, password, rol, estado } = req.body;
       
        if (usuario == "" || password == "" || rol == "" || estado == "") {
            res.json({"msj":"Campos vacios por llenar"})
            
        } else {
            const nuevoUsuario = new Usuario({ usuario, password, rol, estado });
            await nuevoUsuario.save();
            res.status(200).json(nuevoUsuario);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const actualizar_usuario = async (req, res) => {
    try {
        const { usuario, password, rol, estado } = req.body;
        if (req.user.rol !== 1) return res.status(403).json({ msj: "Sin permisos para efectuar esta acción" });
        
        const usuarioBuscado = req.params.usuario;

        await Usuario.updateOne(
            { usuario: usuarioBuscado },
            { $set: { usuario, password, rol, estado } }
        );

        res.status(201).json({ msj: "¡Actualización correcta!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminar_usuario = async (req, res) => {
    try {
        const { usuario } = req.params;

        if (res.user.rol !== 1) return res.status(403).json({ msj: "Sin permisos para efectuar esta acción" });
        const resultado = await Usuario.deleteOne({ usuario });

        if (resultado.deletedCount === 0) {
            return res.status(404).json({ msj: "Usuario no encontrado" });
        }

        res.status(200).json({ msj: "¡Eliminación correcta!" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export { iniciar_sesion, registro_usuario, consultar_usuario, insertar_usuario, actualizar_usuario, eliminar_usuario, consultarUsuarios };
