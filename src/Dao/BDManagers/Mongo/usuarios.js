import  usuarioModel  from "../../models/Mongo/usuarios.js";
import logger from "../../../utils/logger/logger.js";

export default class UsuarioMangerM {

    getByYd = async (id) => {


        try {
            // let id = req.params.id
            let usuarios = await usuarioModel.findOne({ _id: id })
            logger.info("usuario especifico consultado con exito")
            return usuarios
            //res.json({result: "succes", payload:  products})
        }
        catch (err) {
            logger.debug(err)
            logger.error("no es posible consultar el usuario especifico")
        }

    }


    Update = async (id, userUpdate) => {

        try {


            let result = await usuarioModel.updateOne({ _id: id }, userUpdate)
            logger.info("usuario actualizado con exito")
            return result

        } catch (error) {
            logger.debug(err)
            logger.error("no es posible actualizar el usuario")
        }

    }
}