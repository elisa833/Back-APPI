//030598
import { Router } from "express";
import { consulta_juguete, consultar, insertar_juguete, actualizar_juguete, eliminar_juguete } from "../controller/Juguetes.controller.js";
import { consulta, consulta_individual, insercion, actualizacion, eliminacion } from "../controller/Perros.controller.js";
import { consultar_vacuna,insertar_vacuna,actualizar_vacuna,eliminar_vacuna, consultarVacunas } from "../controller/Vacunas.controller.js"
import {consultar_usuario, insertar_usuario, actualizar_usuario, eliminar_usuario, consultarUsuarios, registro_usuario,iniciar_sesion } from "../controller/Usuario.controller.js"
import authMiddleware from '../config/authMiddleware.js';
import upload from "../config/archivoConfig.js";
import { cargar_imagen } from "../controller/Archivos.contoller.js";

const router = Router();

// Rutas para Perros
router.get("/", consulta);
router.get("/consulta/:raza", consulta_individual);
router.post("/insercion",authMiddleware, insercion);
router.put("/actualizacion/:raza", authMiddleware, actualizacion);
router.delete("/eliminacion/:raza",authMiddleware, eliminacion);

// Rutas para Juguetes
router.get("/juguetes", consultar);
router.get("/consulta_juguete/:juguete", consulta_juguete);
router.post("/insertar_juguete", authMiddleware, insertar_juguete);
router.put("/actualizar_juguete/:juguete", authMiddleware, actualizar_juguete);
router.delete("/eliminar_juguete/:juguete", authMiddleware, eliminar_juguete);

//Ruta para vacunas
router.get("/vacunas", consultarVacunas); // Lista todas las vacunas
router.get("/vacuna/:vacuna", consultar_vacuna); // Consulta individual
router.post("/insertarVacuna", authMiddleware, insertar_vacuna); // Inserta una nueva vacuna
router.put("/actualizarVacuna/:nombre", authMiddleware, actualizar_vacuna); // Actualiza una vacuna
router.delete("/eliminarVacuna/:nombre", authMiddleware, eliminar_vacuna); // Elimina una vacuna

// Rutas para usuarios
router.get("/consultarUsuarios", consultarUsuarios);
router.get("/consultar_usuario/:usuario", consultar_usuario);
router.post("/insertar_usuario", authMiddleware, insertar_usuario);
router.put("/actualizar_usuario/:usuario/:tipo", actualizar_usuario);
router.delete("/eliminar_usuario/:usuario/:tipo", eliminar_usuario);
router.post("/registro",registro_usuario);
router.post("/login",iniciar_sesion);

//Ruta archivos
// router.get("/imagen",imagenes);
// router.post("/imagenes",authMiddleware,adminMiddleware,upload.array('image',10))
// router-delete("/imagen/:nombreArchivo",authMiddleware,eliminarImagen)
// router.post("/imagenes",upload.single('image'),cargar_imagen);
router.post('/archivo/descargar',cargar_imagen);

// Manejo de rutas no encontradas
router.use((recibido, respuesta) => {
    respuesta.status(404).json({
        "estatus": "error",
        "msj": "ruta no encontrada"
    });
});

export default router;
