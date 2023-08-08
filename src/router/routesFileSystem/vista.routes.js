import { Router } from "express";
//import ProductManager from "../controlador/productManager.js";
import ProductManager from "../../DAO/DBManagers/FileSystem/productManager.js";


const producto = new ProductManager();
const VistaR = Router()
VistaR.get("/", async (req,res) =>{
    let ProductosT = await producto.getProducts()
    res.render("home", {
        tittle: "productos",
        productos: ProductosT
    })
})
export default VistaR