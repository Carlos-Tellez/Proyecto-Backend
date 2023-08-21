import { Router } from "express";
import UsuarioMangerM from "../../DAO/DBManagers/Mongo/usuarios.js";
import logger from "../../utils/logger/logger.js";

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

})



export default usuarios