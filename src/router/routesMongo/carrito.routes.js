import { Router } from "express";
import CartManagerM from "../../DAO/DBManagers/Mongo/cart.js"

const carrito = new CartManagerM();
const carritoVista = Router()

carritoVista.get("/:id", async (req,res) =>{
    let id = req.params.id
    let  carritoT = await carrito.getCartById(id)
    res.render("cart", {

        tittle: "carritos",
        carritos: carritoT
    })
})


export default carritoVista