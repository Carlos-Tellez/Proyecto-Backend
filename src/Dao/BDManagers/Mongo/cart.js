import { query } from "express"
import { cartModel } from "../../models/Mongo/cart.js"
import productManagerM from "../Mongo/productos.js"
import { ProductModel } from "../../models/Mongo/productos.js";
import {ticketModel} from "../../models/Mongo/ticket.js"
import usuarioModel from "../../models/Mongo/usuarios.js";


const productManager = new productManagerM();
export default class CartManagerM {

    constructor() {

    }

    createCart = async carrito => {
        let result = await cartModel.create(carrito)
        return result
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
                return result1 && result2
                } else {
                    console.log("stock insuficiente")
                }

        } catch (error) {
            console.log("error al actualizar el stock")
        }

    }

    } catch (error) {
        console.log("error al crear el ticket"+ error)
    }


    }

    getCart = async () => {

    try {
        let cart = await cartModel.find().populate("products")
        return cart
    }

    catch (err) {
        console.log("no es posible traer el carrito")
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
        return products[0];


    } catch (error) {
        console.log("no se pudo eliminar el producto del carrito" + error)
    }
    }

    getCartById = async (id) => {

    try {
        let carrito = await cartModel.findOne({ _id: id }).populate("products")
        return carrito
    }
    catch (err) {
        console.log("no es posible buscar el carrito")
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

        return await cartModel.findByIdAndUpdate(
        { _id: cart_id },
        { $push: { products: product }, cantidadT }
        );
    } catch (err) {
        console.log("no es posible" + err)
    }

    }


    UpdateCart = async (cid, pid, productUpdate) => {

    try {
        let result = await ProductModel.findByIdAndUpdate({ _id: cid, _id: pid }, productUpdate)
        return result

    } catch (error) {
        console.log("no fue posible actualizar el producto")
    }

    }


}