import { Router } from "express";
import ProductManager from "../controlador/productManager.js";
const producto = new ProductManager();
const ProductoR = Router()

//app.use(express.json());
//app.use(express.urlencoded({extended: true}));