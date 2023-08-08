import mongoose from "mongoose"
//import productSchema from "./productos.js"
const mensajeCollection = "mensajes"

const mensajeSchema = new mongoose.Schema({

    usuario: { type: String, require: true },
    mensaje: { type: String, require: true }
})

export const cartModel = mongoose.model(mensajeCollection, mensajeSchema )