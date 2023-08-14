import {cartModel} from "../../models/Mongo/mensajes.js"

export default class MensajesManagerM {

    constructor(){

    }

    async #getMaxId() {
        let maxId  = 0;
    }

    async getAll(){
        let result = await cartModel.find()
        return result
    }

    async createMensaje(mensaje) {

        let result = await cartModel.create(mensaje)
        return result
    }
}