import { Router } from "express";

import productManagerM from "../../DAO/DBManagers/Mongo/productos.js"
import CustomErrors from "../../utils/errors/Custom.errors.js";
import EnumErrors from "../../utils/errors/Enum.errors.js";
import generateUserErrorInfo from "../../utils/errors/Info.erros.js";
import { authorization } from "../../config/passport.config.js";
import passport from "passport";
import logger from "../../utils/logger/logger.js";


const producto = new productManagerM();
const VistaRealTimeR = Router()



VistaRealTimeR.get("/",/*authorization('user'),*/ async (req, res)=> {

    try {

        let page = req.query.page;
        let limit = req.query.limit
        let category = req.query.category
        let q = req.query.q
        let price = req.query.price

        let products = await producto.getAll(page ,limit, category, q, price)
        logger.http("ruta accesible")
        res.json({result: "succes", payload:  products})
    }
    catch (err) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }

});


VistaRealTimeR.get("/:id", async (req, res)=> {

    try {
        let id = req.params.id
        let products = await producto.getByYd(id)
        logger.http("ruta accesible")
        res.json({result: "succes", payload:  products})
    }
    catch (err) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }

});


VistaRealTimeR.post("/",/*authorization('admin') ,*/async (req, res, next)=> {
    try {
        const {id,title, description, category, price, stock} = req.body
        if (!title || !description || !category || !price || !stock) {
            CustomErrors.createError({
                name: "Product creation error",
                cause: generateUserErrorInfo({ title, description, category, price, stock }),
                message: "Error trying to create user",
                code: EnumErrors.INVALID_TYPES_ERROR,
            });
        } 
        else {
            try { 
                let result = await producto.createProduct({
                    id,
                    title,
                    description,
                    category,
                    price,
                    stock
                })
                logger.http("ruta accesible")
                res.status(201).json({result: "succes", payload: result})
            }
            catch (err){
                logger.fatal("no es posible acceder a la ruta")
                logger.debug(err)
            }
        }
    } catch (error) {
        next(error);
    }
});


VistaRealTimeR.put("/:id",/* authorization("admin"),*/async (req, res)=> {

    try {
        let {id} = req.params;
        let productUpdate = req.body;

        let result = await producto.Update({_id: id}, productUpdate)
        logger.http("ruta accesible")
        res.send({status: "succes", payload: result})

    } catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }

});

VistaRealTimeR.delete("/:id",/* authorization('admin'),*/async (req, res)=> {

    try {
        let {id} = req.params;
        let result = await producto.Delete({_id: id})
        logger.http("ruta accesible")
        res.send({status: "success", payload: result})
    } 

    catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(err)
    }
});



export default VistaRealTimeR