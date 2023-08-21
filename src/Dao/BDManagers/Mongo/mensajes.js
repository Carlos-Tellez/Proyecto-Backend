import logger from "../../../utils/logger/logger.js";
import {cartModel} from "../../models/Mongo/mensajes.js"

export default class MensajesManagerM {

    constructor(){

    }

    async #getMaxId() {

        let maxId  = 0;
        const msgs = await this.getAll()
    }

    createMensaje = async(obj) => {

        try { 
            let result = await cartModel.create(obj)
            logger.info("mensaje creado con exito en la base de datos")
            return result
        }

        catch (err){
            logger.debug(err)
            logger.error("no es posible guardar el mensaje en la base de datos")
        }
    }

    getAll = async()=> {

        let result = await cartModel.find()
        logger.info("mensajes consultados con exito ")
        return result

    }

}
