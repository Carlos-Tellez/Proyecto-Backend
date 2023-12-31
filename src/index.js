import express from "express";
import ProductoR from "./router/routesFileSystem/product.routes.js";
import CartR from "./router/routesFileSystem/cart.routes.js";
import {engine} from "express-handlebars";
import * as path from "path";
import __dirname from "./utils.js";
import VistaR from "./router/routesFileSystem/vista.routes.js";
import { Server } from "socket.io";
import VistaRealTimeR from "./router/routesMongo/products.routes.js";
import mongoose from "mongoose";
import VistaCarrito from "../src/router/routesMongo/cart.routes.js";
import ChatR from "./router/routesMongo/mensajes.js";
import * as http from 'http';
import  MensajesManagerM from "./DAO/DBManagers/Mongo/mensajes.js";
import productosVista from "../src/router/routesMongo/productos.routes.js";
import carritoVista from "./router/routesMongo/carrito.routes.js";
import handlebars from "express-handlebars";
import vistas from "./router/routesMongo/vistas.router.js";
import session from "express-session"
import MongoStore from "connect-mongo"
import sesiones from "./router/routesMongo/sesiones.routes.js";
import initializePassport from "./config/passport.config.js";
import passport from "passport"
import config from "./config/config.js";
import morgan from "morgan"
import VistaMock from "./router/routesMongo/productosMock.routes.js"
import errorHandler from "./middlewars.erros/index.js"
import usuarios from "./router/routesMongo/usuarios.routes.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import UsuarioArchivos from "./router/routesMongo/usuarios_archivos.js";

const app = express();


const server = http.createServer(app);
const mensajeM = new MensajesManagerM();
const io = new Server(server);
const URL = config.MONGO_URL


mongoose.connect(URL);

app.use(session({
    store: MongoStore.create({
        mongoUrl: URL,
        ttl: 3600,
    }),
    secret: "coder secret",
    resave: false,
    saveUninitialized: false,
}));

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de AdoptMe!!!",
            description: "La documentación de los endpoints",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`],
};


    const specs = swaggerJSDoc(swaggerOptions);
    app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"))

//handlebars
app.engine("handlebars", handlebars.engine())
app.set("view engine", "handlebars")
//app.set("views", path.resolve(__dirname + "/views"))
app.set("views", `${__dirname}/views`)

//static
app.use("/", express.static(__dirname + "/public"))

//VISTA CON FILESYSTEM
app.use("/productos",ProductoR)
app.use("/cart",CartR)
app.use("/view",VistaR)

//VISTA CON MONGO
app.use ("/sesiones", sesiones)
app.use("/", vistas)
app.use("/viewR",VistaRealTimeR)
app.use("/carrito", VistaCarrito)
app.use("/chatR",ChatR )
app.use("/productosM", productosVista)
app.use("/carritoM", carritoVista)
app.use("/mocking", VistaMock)
app.use("/usuarios", usuarios)
app.use("/UsuarioA", UsuarioArchivos)

app.use(errorHandler)

const PORT = config.PORT;

server.listen(PORT, ()=>{

    console.log("servidor Activo en el puerto: 8080" );

});


io.on('connection', (socket) => {

    console.log("Nuevo usuario conectado", socket.id);

    socket.on('newUser', (user)=> {
        console.log(`> ${user} ha iniciado sesion`)
    })

    socket.on('chat:mensaje' , async (msg) => {

        await mensajeM.createMensaje(msg);
        io.emit('mensajes', await mensajeM.getAll())
    })

    socket.on('newUser', (user)=> {
        socket.broadcast.emit('newUser', user)
    })

    socket.on('chat:typing', (data)=> {

        socket.broadcast.emit('chat:typing', data)
    })

    socket.on('disconnect', ()=>{
        console.log("usuario desconectado", socket.id)
    })

});