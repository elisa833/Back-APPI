import express from 'express';
import cors from 'cors';
import router from './routes/web.js';
import Conexion from './config/Conexion.js';
import path from 'path';

const app = express();
//indicamos que va utilizar algo
Conexion();
app.use(express.json()); //trabajaremos con formatos json
app.use(cors()); 
// dotenv.config() //leer variables de entorno
app.use('/uploads', express.static(path.join(process.cwd(), '/', 'uploads')));
app.use("/",router)

app.use((recibido, respuesta)=>{
    respuesta.status(404).json({
        "estatus":"error",
        "msj":"ruta no localizada"
    });
})

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO,() => {
    console.log(`El servidor esta corriendo`);
    console.log(`url: http://localhost:${PUERTO}`);
})