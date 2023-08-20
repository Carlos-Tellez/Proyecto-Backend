import { Router } from "express";
import generateProducts from "../../utils/productosMock.utils.js";
import { authorization } from "../../config/passport.config.js";

const VistaMock = Router();


VistaMock.get("/", async (req, res)=> {

    try {
        const productos = generateProducts(100);
        res.send(productos);
        //res.json({result: "succes", payload:  productos})
    }
    catch (error) {
            console.log("no es posible generar los productos" + error)
    }

});


export default VistaMock;