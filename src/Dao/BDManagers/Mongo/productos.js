import { ProductModel } from "../../models/Mongo/productos.js";

export default class productManagerM {

    constructor(){


    }


    getAll = async () => {

    try {

        let products = await ProductModel.find()
        return products
    }
    catch (err) {
            console.log("no es posible traer los productos")
    }

    }

    createProduct = async(product) => {

        try { 
        let result = await ProductModel.create(product)
            //res.status(201).json({result: "succes", payload: result})
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