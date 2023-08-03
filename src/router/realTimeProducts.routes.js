import { Router } from "express";
import ProductManager from "../controlador/productManager.js";


const producto = new ProductManager();
const VistaRealTimeR = Router()




//const socket = io();

//socket.emit("message", "Hola mundo");


export default VistaRealTimeR