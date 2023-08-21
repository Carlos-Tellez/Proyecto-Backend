import { Router } from "express";
import generateProducts from "../../utils/productosMock.utils.js";
import { authorization } from "../../config/passport.config.js";
import logger from "../../utils/logger/logger.js";

const VistaMock = Router();


VistaMock.get("/", async (req, res)=> {

    try {
        const productos = generateProducts(100);
        logger.http("ruta accesible")
        res.send(productos);

    }
    catch (error) {
        logger.fatal("no es posible acceder a la ruta")
        logger.debug(error)
    }

});


export default VistaMock;