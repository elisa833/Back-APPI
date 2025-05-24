import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    try {
        if (!token) return res.status(401).json({ msj: "Token no proporcionado o formato incorrecto" });
        const decodificado = jwt.verify(token.replace("Bearer ",""),process.env.JWT_SECRET);
        res.user = decodificado;
        next(); 
    } catch (error) {
        console.error("Error al verificar el token", error);
        res.status(500).json({ msj: "Se ha generado un error al verificar el token" });
    }
};

export default authMiddleware;
