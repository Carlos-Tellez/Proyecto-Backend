import { query } from "express"
import { cartModel } from "../../models/Mongo/cart.js"
import productManagerM from "../Mongo/productos.js"
import { ProductModel } from "../../models/Mongo/productos.js";
import {ticketModel} from "../../models/Mongo/ticket.js"
import usuarioModel from "../../models/Mongo/usuarios.js";
import logger from "../../../utils/logger/logger.js";


const productManager = new productManagerM();
export default class CartManagerM {

    constructor() {

    }

    createCart = async carrito => {
        try {
            let result = await cartModel.create(carrito)
            logger.info("carrito creado con exito")
            return result
        } catch (error) {
            logger.debug(error)
            logger.error("no es posible crear el carrito")
        }
    }

    createticket = async (cid,email) => {
    
        let carrito = await cartModel.findOne({ _id: cid })

        const products = carrito.products;

        try {

    for (const productId of products) {

        try {
            let producto = await ProductModel.findOne({ _id: productId })
            const total = producto.incart * producto.price
            console.log(total)

            if (producto.stock > producto.incart) {
                let result1 = await ProductModel.updateMany(
                    { _id: { $in: products } },
                    [
                        {
                            $set: {
                                stock: {
                                $subtract: ["$stock", "$incart"]
                                }
                            }
                        }
                    ]
                );

                let compra = {
                    "id_carrito": cid,
                    "amount": total,
                    "email": email
                }

                let result2 = await ticketModel.create(compra)
                logger.info("el ticket se a creado con exito")
                return result1 && result2
                } else {
                    logger.warning("Stock insuficiente")
                }

        } catch (error) {
            logger.warning("No es posible actualizar el stock")
            logger.debug(error)
        }

    }

    } catch (error) {
        logger.error("Se a presentado un error al crear el ticket en la base de datos")
        logger.debug(error)
    }


    }

    getCart = async () => {

    try {
        let cart = await cartModel.find().populate("products")
        logger.info("Carritos  totales consultados")
        return cart
    }

    catch (err) {
        logger.error("no es posible consultar los carritos en la base de datos")
        logger.debug(err)
    }

    }

    DeleteCart = async (id) => {

    try {
        let result = await cartModel.deleteOne({ _id: id })
        return result
    } catch (error) {
        console.log("no fue posible eliminar el carrito")
    }

    }

    deleteProdinCart = async (cartid, productid) => {
    try {
        const { products } = await cartModel.findOne(
        { _id: cartid },
        {
            products: { $elemMatch: { id: productid } },
        }
        );

        await cartModel.updateOne(
            { _id: cartid },
            {
            $pull: { products: { _id: productid } },
            }
        );
        logger.info("producto eliminado de carrito con exito")

        return products[0];


    } catch (error) {
        logger.debug(error)
        logger.error("No es posible eliminar el producto del carrito")
    }
    }

    getCartById = async (id) => {

    try {
        let carrito = await cartModel.findOne({ _id: id }).populate("products")
        logger.info("carrito especifico consultado con exito")
        return carrito
    }
    catch (err) {
        logger.debug(err)
        logger.error("no es posible buscar el carrito especifico")
    }
    }

    addProductInCart = async (cart_id, pid, product, cantidad) => {
    try {
        const { products } = await cartModel.findOne(
        { _id: cart_id },
        {
            products: { $elemMatch: { _id: product._id } },
        }
        ).populate("products");
        if (products.length > 0) {
        await this.deleteProdinCart(cart_id, product._id);
        }
        const cantidadT = product.incart + cantidad

        logger.info("producto añadido al carrito con exito")
        return await cartModel.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, cantidadT }
        );
    } catch (err) {
        logger.debug(err)
        logger.error("no es posible agregar el producto al carrito")
    }

    }


    UpdateCart = async (cid, pid, productUpdate) => {

    try {
        let result = await ProductModel.findByIdAndUpdate({ _id: cid, _id: pid }, productUpdate)
        logger.info("carrito actualizado con exito")
        return result

    } catch (error) {
        logger.debug(error)
        logger.error("erro al actualizar el carrito")
    }

    }


}