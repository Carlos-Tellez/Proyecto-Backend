import { Router } from "express";
import ProductManager from "../../DAO/DBManagers/FileSystem/productManager.js";


const producto = new ProductManager();
const ChatR = Router()



ChatR.get("/", async (req,res) =>{
    // let ProductosT = await producto.getProducts()
    res.render("chat", {

        tittle: "productos",
         //productos: ProductosT
    })
})

export default ChatR