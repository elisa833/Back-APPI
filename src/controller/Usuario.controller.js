import Usuario from '../models/Usuario.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const registro_usuario = async (recibido,respuesta) => {
    try {
        const {usuario, password,rol,registro} = recibido.body;
        console.log("Datos recibidos:", usuario, password, rol);
        const cifrado = await bcrypt.hash(password,10);
        const nuevoUsuario = new Usuario({"usuario":usuario,"password":cifrado,rol,"estado":0});
        await nuevoUsuario.save();

        const token = jwt.sign(
            { id: nuevoUsuario._id, rol: nuevoUsuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        respuesta.status(201).json({"msj":"Usuario registrado","registro":registro, token: token})

    } catch (error) {
        console.error("Error en registro:", error);
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
            "id":consultaUsuario._id, 
            "rol":consultaUsuario.rol
        }, 
            process.env.JWT_SECRET, {"expiresIn":"1hr"}
        );

        respuesta.status(201).json({"msj":"Inicio de sesion exitoso!","token":token,"usuario":consultaUsuario})
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
        const usuarioBuscado = req.params.usuario;
        const usuarioTipo = req.params.tipo;

        if (password == '') {
            await Usuario.updateOne(
                { usuario: usuarioBuscado },
                { $set: { "usuario":usuario,"rol":rol,"estado":estado} }
            );
            if (usuarioTipo == usuarioBuscado) {
                res.status(201).json({ msj: "¡Actualización correcta!",tipo:"adm"});
            }
            res.status(201).json({ msj: "¡Actualización correcta!",tipo:"normal"});
        } else {
            const  cifrado = await bcrypt.hash(password,10);
            await Usuario.updateOne(
                { usuario: usuarioBuscado },
                { $set: { "usuario":usuario, "password":cifrado,"rol":rol,"estado":estado} }
            );
            if (usuarioTipo == usuarioBuscado) {
                res.status(201).json({ msj: "¡Actualización correcta!",tipo:"adm"});
            }
            res.status(201).json({ msj: "¡Actualización correcta!",tipo:"normal"});
        }
        
    } catch (error) {
        res.status(500).json({ msj: error.message });
    }
};

const eliminar_usuario = async (req, res) => {
    try {
        const usuario = req.params.usuario;
        const tipo = req.params.tipo;

        if (tipo == usuario) return res.status(404).json({ msj: "No puedes eliminartr a ti mismo" });

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
