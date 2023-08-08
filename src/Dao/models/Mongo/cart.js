import mongoose from "mongoose"
//import productSchema from "./productos.js"
const cartCollection = "carrito"

const cartSchema = new mongoose.Schema({

    id: { type: String, require: true },
    products: {

        type: Array,
        default: []   

    }

})

export const cartModel = mongoose.model(cartCollection, cartSchema )