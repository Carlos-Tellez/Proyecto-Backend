import {cartModel} from "../../models/Mongo/cart.js"


export default class CartManagerM {


    constructor(){


    }

    createCart = async carrito => {

        let result = await cartModel.create(carrito)
        return result
    }

    getCart = async () => {

        try {

            let cart = await cartModel.find()
            return cart
        }
        catch (err) {
                console.log("no es posible traer el carrito")
        }
    }

    DeleteCart = async (id) => {

        try {
            let result = await cartModel.deleteOne({_id: id})
        return result
        } catch (error) {
            console.log("no fue posible eliminar el carrito")
        }

    }

}