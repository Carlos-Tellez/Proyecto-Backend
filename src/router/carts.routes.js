import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager 


CartRouter.post("/",async (req,res) => {
    res.send(await carts.addCarts());

});

//listar
CartRouter.get("/", async (req,res) =>{
    res.send(await carts.readCarts())
});

//listar por Id
CartRouter.get("/:cid",async (req,res) =>{
    res.send(await carts.getCartsById(req.params.cid))
});

//Funcion Agregar
CartRouter.post("/:cid/products/:pid", async (req,res) =>{
    let cartId = req.params.cid
    let productId = req.params.pid
    res.send(await carts.addProductInCart(cartId, productId))
});


export default CartRouter