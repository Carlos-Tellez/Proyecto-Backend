import { Router } from "express";
import ProductManager from "../controllers/ProductManager.js";


const ProductRouter = Router();
const product = new ProductManager();

//Funcion Listar
ProductRouter.get("/",async (req,res) =>{
    res.send(await product.getProducts())
});

//Funcion liatarpor Id
ProductRouter.get("/:id",async (req,res) =>{
    let id = req.params.id
    res.send(await product.getProductsById(id))
});

//Funcion Agregar
ProductRouter.post("/",async (req,res) => {
    let newProduct = req.body
    res.send(await product.addProducts(newProduct))
});

//Funcion Actualizar
ProductRouter.put("/:id",async (req,res) => {
    let id = req.params.id;
    let updateP = req.body;
    res.send(await product.updateProducts(id,updateP))
}),

//Funcion Eliminar
ProductRouter.delete("/:id", async (req,res) =>{
    let id = req.params.id
    res.send(await product.deleteProducts(id))
});

export default ProductRouter