import { Router } from "express";
//import CartManager from "../controlador/CartManager.js";
import CartManager from "../../DAO/DBManagers/FileSystem/CartManager.js";

const CartR = Router()
const carts = new CartManager()
CartR.post("/", async (req, res)=> {
    res.send(await carts.addCart())
})
CartR.get('/', async (req, res)=> {
    res.send(await carts.read())
    
})
CartR.get('/:id', async (req, res)=> {
    let id = req.params.id
    res.send(await carts.getCarritoById(id))
})
CartR.post('/:cid/products/:pid', async(req, res)=>{
    let cartid = req.params.cid
    let productid = req.params.pid
    res.send(await carts.addProdinCart(cartid,productid))
})
export default CartR