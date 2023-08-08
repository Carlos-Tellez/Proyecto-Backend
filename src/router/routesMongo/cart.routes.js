import { Router } from "express";
import CartManagerM from "../../DAO/DBManagers/Mongo/cart.js";


const cart = new CartManagerM();

const VistaCarrito = Router()

VistaCarrito.post("/", async (req, res)=> {


    //if(!id)
    try {

        const {id } = req.body
        let result = {
            id,
            products: req.body
        }
        const result2 = await cart.createCart(result)
        res.status(201).json({result: "succes", payload: result2})
    }

    catch (err){
        console.log("no fue posible crear el carrito" + err)
    }
})


VistaCarrito.get("/", async (req, res)=> {

    try {
        let carrito = await cart.getCart()
        res.json({result: "succes", payload:  carrito})
    } catch (error) {

    }
})

VistaCarrito.delete("/:id", async (req, res)=> {


    let {id} = req.params;
    let result = await cart.DeleteCart({_id: id})
    res.send({status: "success", payload: result})
})

export default VistaCarrito