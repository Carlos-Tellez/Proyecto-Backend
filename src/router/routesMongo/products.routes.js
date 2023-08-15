import { Router } from "express";

import productManagerM from "../../DAO/DBManagers/Mongo/productos.js"
import {ProductModel} from "../../DAO/models/Mongo/productos.js"


const producto = new productManagerM();
const VistaRealTimeR = Router()



VistaRealTimeR.get("/", async (req, res)=> {

    try {

        let page = req.query.page;
        let limit = req.query.limit
        let category = req.query.category
        let q = req.query.q
        let price = req.query.price

        let products = await producto.getAll(page ,limit, category, q, price)
        res.json({result: "succes", payload:  products})
    }
    catch (err) {
            console.log("no es posible conectar")
    }

});


VistaRealTimeR.get("/:id", async (req, res)=> {

    try {
        let id = req.params.id
        let products = await producto.getByYd(id)
        res.json({result: "succes", payload:  products})
    }
    catch (err) {
        console.log("no es posible buscar el producto")
    }

})


VistaRealTimeR.post("/", async (req, res)=> {

    const {id,title, description, category, price, stock} = req.body
    //if(!id)
    try { 
    let result = await producto.createProduct({
            id,
            title,
            description,
            category,
            price,
            stock
        })
        res.status(201).json({result: "succes", payload: result})
    }

    catch (err){
        console.log("no fue posible crear el producto" + err)
    }
})


VistaRealTimeR.put("/:id", async (req, res)=> {

    try {
        let {id} = req.params;
        let productUpdate = req.body;

        let result = await producto.Update({_id: id}, productUpdate)
        res.send({status: "succes", payload: result})

    } catch (error) {
        console.log("no fue posible actualizar el producto")
    }

})

VistaRealTimeR.delete("/:id", async (req, res)=> {


    let {id} = req.params;
    let result = await producto.Delete({_id: id})
    res.send({status: "success", payload: result})
})



export default VistaRealTimeR