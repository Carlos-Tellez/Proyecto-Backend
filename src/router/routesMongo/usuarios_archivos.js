import { Router } from "express";

import CartManagerM from "../../DAO/DBManagers/Mongo/cart.js"


const carrito = new CartManagerM();
const UsuarioArchivos = Router()

UsuarioArchivos.get("/",  async (req,res) =>{

    res.render("archivos", {

        tittle: "Archivos",

    })
})


export default UsuarioArchivos