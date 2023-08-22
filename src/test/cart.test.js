import chai from "chai";
import mongoose from "mongoose";
import { cartModel } from "../DAO/models/Mongo/cart.js";
import config from "../config/config.js";
import CartManagerM from "../DAO/DBManagers/Mongo/cart.js";
import express from "express";
import VistaCarrito from "../router/routesMongo/cart.routes.js";
import request from "supertest";

const expect = chai.expect;

const URL = config.MONGO_URL;


mongoose.connect(URL);

describe("getCartById", () => {
it("returns the correct cart when a valid ID is provided", async () => {
    // Crea un carrito de ejemplo en la base de datos
    const cartManager = new CartManagerM();
    const newCart = {
      products: ["producto-456", "producto-789"], // Supongamos que estos son IDs válidos de productos en la base de datos

    };
    const createdCart = await cartManager.createCart(newCart);

    // Realiza una solicitud para obtener el carrito recién creado por su ID
    const app = express();
    app.use("/", VistaCarrito);
    const response = await request(app).get(`/${createdCart._id}`);

    // Verifica si la solicitud fue exitosa y si el carrito devuelto coincide con el carrito creado
    expect(response.status).to.equal(200);
    expect(response.body.result).to.equal("success");
    expect(response.body.payload).to.be.an("object");
    expect(response.body.payload._id).to.equal(String(createdCart._id));
}).timeout(5000)


});


describe("DeleteCart", () => {
it("deletes a cart when a valid ID is provided", async () => {
    // Crea un carrito de ejemplo en la base de datos
    const cartManager = new CartManagerM();
    const newCart = {
      products: ["producto-123", "producto-456"], // Supongamos que estos son IDs válidos de productos en la base de datos
    };
    const createdCart = await cartManager.createCart(newCart);

    // Realiza una solicitud para eliminar el carrito recién creado por su _id generado por MongoDB
    const app = express();
    app.use("/", VistaCarrito);
    const response = await request(app).delete(`/${createdCart._id}`);

    // Verifica si la solicitud fue exitosa y si el carrito se eliminó correctamente
    expect(response.status).to.equal(200);
    expect(response.body.status).to.equal("success");
    expect(response.body.payload).to.be.an("object");
    expect(response.body.payload.deletedCount).to.equal(1);
});


});
