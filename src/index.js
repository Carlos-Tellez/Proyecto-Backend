import express from "express";
import ProductoR from "./router/product.routes.js"
import CartR from "./router/cart.routes.js"
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./controlador/productManager.js";
import VistaR from "./router/vista.routes.js";
import { Server } from "socket.io"
import VistaRealTimeR from "./router/realTimeProducts.routes.js";

const app = express();
const producto = new ProductManager();


app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static
app.use("/", express.static(__dirname + "/public"))




app.use("/productos",ProductoR)
app.use("/cart",CartR)
app.use("/view",VistaR)
app.use("/viewR",VistaRealTimeR)

app.listen(8080, ()=>{
    const httpServer = app.listen(8080, ()=>{
    console.log("servidor arriba en el puerto: 8080" );
});
});


//socketserver

const socketServer = new Server(httpServer)

socketServer.on("connection", socket => {

    console.log("client connected by sockets")


})