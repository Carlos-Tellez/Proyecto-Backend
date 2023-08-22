import { Router } from "express";
import UsuarioMangerM from "../../DAO/DBManagers/Mongo/usuarios.js";
import logger from "../../utils/logger/logger.js";
import multer from "multer";

const usuarios = Router()

const usuario = new UsuarioMangerM();


usuarios.get("/premium/:uid", (req,res)=>{

    res.render("registro")
})


usuarios.put("/premium/:uid",/* authorization("admin"),*/async (req, res)=> {

    try {
        let {uid} = req.params;
        let userUpdate = req.body;

        let result = await usuario.Update({_id: uid}, userUpdate)
        logger.http("ruta accesible")
        res.send({status: "succes", payload: result})

    } catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }

});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/documents");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage });

  // Ruta POST para subir uno o múltiples archivos
    usuarios.post("/upload/:uid/documents", upload.array("documents"), async (req, res) => {
    try {
        const { uid } = req.params;
        const files = req.files;
        console.log("Archivos recibidos:", files);
      // Actualizar el usuario con la información de los documentos subidos
        const userUpdate = { documents: files.map((file) => ({ name: file.originalname, reference: file.path })) };
        const result = await usuario.Update({ _id: uid }, userUpdate);

        res.send({ status: "success", payload: result });
    } catch (error) {
        logger.error("Error al subir los archivos");
        logger.debug(error);
        res.status(500).send({ status: "error", message: "Error al subir los archivos" });
    }
});



export default usuarios