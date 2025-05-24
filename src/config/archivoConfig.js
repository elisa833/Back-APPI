import multer from "multer";
import path from "path";

const extensionesImagen = ['.jpg','.jpeg','.png','.gif','.webp'];
const storage = multer.diskStorage({
    destination: (recibido,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(recibido,file,cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

const fileFilter = (recibido,file,cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (extensionesImagen.includes(extension)) {
        cb(null,true)
    } else {
        cb(new Error('Tipo de archivo no permitido.'),false);
    }
};

const limits = { fileSize: 3 * 1024 * 1024};
const upload = multer({storage,fileFilter,limits});

export default upload;