import jwt from "jsonwebtoken";

const authMiddleware = (recibido, respuesta,next) => {
    const token = recibido.header("Autorizacion");
    try {
        if (!token) return respuesta.status(401).json({"msj":"Token no proporcionado!"});
        
        const decodificado = jwt.verify(token.replace("Back ", ""), process.env.JWT_SECRET);

        respuesta.user = decodificado;
        next(); 
    } catch (error) {
        respuesta.status(500).json({"msj":"Se a generado un error en el servidor"});
    }
}

export default authMiddleware;