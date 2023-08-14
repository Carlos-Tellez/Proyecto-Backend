import express from "express";
import ProductoR from "./router/routesFileSystem/product.routes.js"
import CartR from "./router/routesFileSystem/cart.routes.js"
import {engine} from "express-handlebars"
import * as path from "path"
import __dirname from "./utils.js";
import ProductManager from "./DAO/DBManagers/FileSystem/productManager.js";
import VistaR from "./router/routesFileSystem/vista.routes.js";
import { Server } from "socket.io"
import VistaRealTimeR from "./router/routesMongo/realTimeProducts.routes.js";
import mongoose from "mongoose";
import VistaCarrito from "../src/router/routesMongo/cart.routes.js"
import ChatR from "./router/routesMongo/mensajes.js";
import * as http from 'http'
import * as socketio from 'socket.io'
import  MensajesManagerM from "./DAO/DBManagers/Mongo/mensajes.js"
//import conectarS from "./DAO/DBManagers/Mongo/mensajes.js"
const app = express();
//const producto = new ProductManager();
//const http = require('http');
//const socketio = require('socket.io');

const server = http.createServer(app);
//const conect1 = new conectarS()
const mensajeM = new MensajesManagerM()
//conect1.conect(server)
//require('../src/DAO/DBManagers/Mongo/mensajes.js')(io);

//io.listen(server)



mongoose.connect("mongodb+srv://sbejarano:6exZyyAwm4byMnkh@eccomerce.cpjouqp.mongodb.net/?retryWrites=true&w=majority");

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//handlebars
app.engine("handlebars", engine())
app.set("view engine", "handlebars")
app.set("views", path.resolve(__dirname + "/views"))

//static
app.use("/", express.static(__dirname + "/public"))

//VISTA CON FILESYSTEM
app.use("/productos",ProductoR)
app.use("/cart",CartR)
app.use("/view",VistaR)

//VISTA CON MONGO
app.use("/viewR",VistaRealTimeR)
app.use("/carrito", VistaCarrito)
app.use("/chatR",ChatR )


server.listen(8080, ()=>{

    console.log("servidor arriba en el puerto: 8080" );

    server.on('connection', socket => {

        console.log("Nuevo usuario conectado", socket.id);

        socket.on('disconnect', ()=>{
            console.log("usuario desconectado", socket.id)
        })

        socket.on("chat: message", async (msg) => {
            await mensajeM.createMensaje(msg)
            server.emit('messages'), await mensajeM.getAll()
        })

    })


});


//socketserver

//const socketServer = new Server(httpServer)
/*
socketServer.on('connect', () => {
    console.log("client connected by sockets")
    /* socket.on('disconnected', ()=> {
        console.log("Cliente disconnected")
    })
})*/