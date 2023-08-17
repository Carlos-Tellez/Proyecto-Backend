import mongoose from "mongoose";


const collection = "usuarios"

const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: { type: String, default: 'user' } 
})

const usuarioModel = mongoose.model(collection, usuarioSchema)
export default usuarioModel