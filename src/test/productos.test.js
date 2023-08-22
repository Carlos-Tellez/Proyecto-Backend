import request from "supertest";
import express from "express";
import VistaRealTimeR from "../router/routesMongo/Products.routes.js";
import { expect } from "chai";
import productManagerM from "../DAO/DBManagers/Mongo/productos.js";
import mongoose from "mongoose";
import config from "../config/config.js";

const URL = config.MONGO_URL

mongoose.connect(URL);


describe("getByYd", () => {
    it("returns the correct product when a valid ID is provided", async () => {
        // Crea un producto de ejemplo en la base de datos
        const productManager = new productManagerM();
        const newProduct = {
            title: "Producto de prueba",
            description: "Descripción del producto de prueba",
            category: "Categoría de prueba",
            price: 10,
            stock: 100,
};

        const createdProduct = await productManager.createProduct(newProduct);

        // Realiza una solicitud para obtener el producto recién creado por su ID
        const app = express();
        app.use("/", VistaRealTimeR);
        const response = await request(app).get(`/${createdProduct._id}`);

        // Verifica si la solicitud fue exitosa y si el producto devuelto coincide con el producto creado
        expect(response.status).to.equal(200);
        expect(response.body.result).to.equal("success");
        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload._id).to.equal(String(createdProduct._id));
    }).timeout(5000)

});


describe("Delete", () => {
    it("deletes a product when a valid ID is provided", async () => {
        // Crea un producto de ejemplo en la base de datos
        const productManager = new productManagerM();
        const newProduct = {
            title: "Producto de prueba",
            description: "Descripción del producto de prueba",
            category: "Categoría de prueba",
            price: 10,
            stock: 100,
};
        const createdProduct = await productManager.createProduct(newProduct);

        // Realiza una solicitud para eliminar el producto recién creado por su ID
        const app = express();
        app.use("/", VistaRealTimeR);
        const response = await request(app).delete(`/${createdProduct._id}`);

        // Verifica si la solicitud fue exitosa y si se eliminó correctamente el producto
        expect(response.status).to.equal(200);
        expect(response.body.status).to.equal("success");
        expect(response.body.payload).to.be.an("object");
        expect(response.body.payload.deletedCount).to.equal(1);
    });


});