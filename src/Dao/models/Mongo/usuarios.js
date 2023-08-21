import mongoose from "mongoose";


const collection = "usuarios"

const usuarioSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: { type: String, default: 'user' } ,
    resetPasswordToken: String, // Token para restablecer contraseña
    resetPasswordExpires: Date, // Fecha de expiración del token de restablecimiento
})

const usuarioModel = mongoose.model(collection, usuarioSchema)
export default usuarioModel