import { query } from "express";
import { ProductModel } from "../../models/Mongo/productos.js";
import logger from "../../../utils/logger/logger.js";

export default class productManagerM {

    constructor(){


    }


    getAll = async (pageR, limitR, categoryR, q, priceR) => {

        try {

            const limit = parseInt(limitR, 10) || 10;
            const page = parseInt(pageR, 10) || 10;
            const precioS = parseInt(priceR)
            const filter = {};
            if(categoryR) {
                filter.category = categoryR;
            }
            let products = await ProductModel.paginate(filter, { limit, page, sort: { price: precioS } })
            logger.info("productos consultados con exito")
            console.log(products);
            return products 
        }
        catch (err) {
            logger.debug(err)
            logger.error("no es posible consultar los productos")
        }

    }

    getAll2 = async (page, limit, category, q) => {

    try {

        const limitRecords = parseInt(limit);
        const skip = (page -1) * limit;

        let query = {};
        if(q) {
            query = {$text: {$search: q}};
        }
        if(category) query.category = category;

        logger.info("productos consultados con exito")
        return products
    }

    
    catch (err) {
        logger.debug(err)
        console.log(err)
        logger.error("no es posible consultar los productos")
    }

    }

    createProduct = async (product) => {

        try {
            let result = await ProductModel.create(product)
            logger.info("producto creado con exito")
            return result
        }

        catch (err) {
            logger.debug(err)
            logger.error("no es posible crear el producto")
        }
    }

    getByYd = async (id) => {


        try {
            let products = await ProductModel.findOne({ _id: id })
            logger.info("producto especifico consultado con exito")
            return products
        }
        catch (err) {
            logger.debug(err)
            logger.error("no es posible consultar el producto especifico")
        }

    }

    Update = async (id, productUpdate) => {
        try{
            let result = await ProductModel.updateOne({ _id: id }, productUpdate)
            logger.info("producto actualizado con exito")
            return result
        } 
        catch (error) {
            logger.debug(err)
            logger.error("no es posible actualizar el producto")
        }
    }


    Delete = async (id) => {

        try {
            let result = await ProductModel.deleteOne({ _id: id })
            logger.info("producto eliminado con exito")
            return result
        } 
        catch (error) {
            logger.debug(err)
            logger.error("no es posible eliminar el producto")
        }

    }


} 