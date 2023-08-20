import { query } from "express";
import { ProductModel } from "../../models/Mongo/productos.js";

export default class productManagerM {

    constructor(){


    }


    getAll = async (pageR, limitR,categoryR, q, priceR ) => {

        try {

            const limit = parseInt(limitR, 10) || 10;
            const page = parseInt(pageR,1) || 1;
            const precioS = parseInt(priceR)
            const filter = {};
            if(categoryR) {
                filter.category = categoryR;
            }
            let products = await ProductModel.paginate(filter,{limit, page, sort:{price:precioS} })

            return products 
        }
        catch (err) {
            console.log("no es posible traer los productos")
        }

    }

    getAll2 = async (page, limit,category, q) => {

    try {

        const limitRecords = parseInt(limit);
        const skip = (page -1) * limit;

        let query = {};
        if(q) {
            query = {$text: {$search: q}};
        }
        if(category) query.category = category;

        let products = await ProductModel.find(query).limit(limitRecords).skip(skip).lean()

        return products
    }

    
    catch (err) {
            console.log("no es posible traer los productos")
    }

    }

    createProduct = async(product) => {

        try { 
            let result = await ProductModel.create(product)
            return result
        }

        catch (err){
            console.log("no fue posible crear el producto" + err)
        }
    }

    getByYd = async (id) => {


        try {
            let products = await ProductModel.findOne({ _id: id})
            return products
        }
        catch (err) {
            console.log("no es posible buscar el producto")
        }

    }

    Update = async (id, productUpdate) => {

        try {
            let result = await ProductModel.updateOne({_id: id}, productUpdate)

        return result

        } catch (error) {
            console.log("no fue posible actualizar el producto")
        }

    }


    Delete = async (id) => {

        try {
            let result = await ProductModel.deleteOne({_id: id})
        return result
        } catch (error) {
            console.log("no fue posible eliminar el producto")
        }

    }


} 