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
            return result
        }

        catch (err){
            console.log("no fue posible guardar el mensaje" + err)
        }
    }

    getAll = async()=> {

        let result = await cartModel.find()
        return result

    }

}
