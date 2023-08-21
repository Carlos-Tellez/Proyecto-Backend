import { Router } from "express";
import CartManagerM from "../../DAO/DBManagers/Mongo/cart.js";
import { ObjectId } from "mongoose";
import productManagerM from "../../DAO/DBManagers/Mongo/productos.js"
import { authorization } from "../../config/passport.config.js";
import logger from "../../utils/logger/logger.js";
import authenticateToken from "../../config/authMiddleware.js";

const carrito = new CartManagerM();
const producto = new productManagerM();

//Post

VistaCarrito.post("/", async (req, res) => {

    try {

        const { id } = req.body
        let result = {
            id,
            products: req.body
        }
        const result2 = await carrito.createCart(result);
        logger.http("ruta accesible")
        res.status(201).json({ result: "succes", payload: result2 })
    }

    catch (err){
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }
});

//Post por id 

VistaCarrito.post("/:id/products/:pid",  /*authorization('user'),*/ async (req, res) => {

    try {
        let id = req.params.id
        let pid = req.params.pid
        let cantidad = req.body.cantidad

        const product = await producto.getByYd(pid)
        const cart = await carrito.getCartById(id);

        if (!cart) {
            console.log("carrito no encontrado")
        }

        const result = await carrito.addProductInCart(id, pid, product, cantidad)
        logger.http("ruta accesible")
        res.status(201).json({ result: "succes", payload: result })        

    }
    catch (err) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }
});

//Get 

VistaCarrito.get("/", async (req, res) => {

    try {
        let carrit = await carrito.getCart()
        logger.http("ruta accesible")
        res.json({ result: "succes", payload: carrit })
    } catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }
});

// Get por Id 

VistaCarrito.get("/:id", async (req, res) => {

    try {
        let id = req.params.id
        let products = await carrito.getCartById(id)
        logger.http("ruta accesible")
        res.json({ result: "succes", payload: products })
    }
    catch (err) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }
});

//Delete

VistaCarrito.delete("/:id", async (req, res) => {

try {
        let { id } = req.params;
        let result = await carrito.DeleteCart({ _id: id })
        logger.http("ruta accesible")
        res.send({ status: "success", payload: result })
    } 

    catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }
});

// Delete por Id 

VistaCarrito.delete('/:cid/products/:pid', async (req, res) => {
    try {
        let cartid = req.params.cid
        let productid = req.params.pid
        logger.http("ruta accesible")
        res.send(await carrito.deleteProdinCart(cartid, productid))
    } catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }
});

VistaCarrito.put("/:cid/products/:pid", async (req, res) => {

    try {
        let pid = req.params.pid;
        let cid = req.params.cid;
        let productUpdate = req.body;

        let result = await producto.Update({ _id: cid, _id: pid }, productUpdate)
        logger.http("ruta accesible")
        res.send({ status: "succes", payload: result })

    } catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }

});

VistaCarrito.post("/:cid/purchase", /*authenticateToken,*/async (req, res) => {
    let c_id = req.params.cid;
    const cart = await carrito.getCartById(c_id);
    const email = req.session

    try {
        let result = await carrito.createticket(c_id, email)
        logger.http("ruta accesible")
        res.send({ status: "succes", payload: result })
    } 

    catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }
});

export default VistaCarrito