import { Router } from 'express';
import { promises as fs } from 'fs'
import { nanoid } from "nanoid"
import ProductManager from './productManager.js';

const productoT = new ProductManager()
class CartManager {

    constructor() {

        this.path = "./src/models/cart.json"
        this.path = "./src/DAO/models/FileSystem/cart.json"
    }


    read = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    };
    write = async (cart) => {
        await fs.writeFile(this.path, JSON.stringify(cart));
    };
    exist = async (id) => {
        let carts = await this.read();
        return carts.find(cart => cart.id === id )

    };
    addCart = async () =>{
        let carritosexistentes = await this.read();
        let id = nanoid(4)
        let cartsC = [{id:id , products : []}, ...carritosexistentes]
        await this.write(cartsC)
        return "Carrito agregado"
    };
    getCarritoById = async (id) => {

        let carritoporId = await  this.exist(id)//products.find(producto => producto.id === id)
        if(!carritoporId) return "carrito no encontrado"
        return carritoporId
    };
    addProdinCart = async (cartid, productid) =>{
        let carritoporId = await  this.exist(cartid)//products.find(producto => producto.id === id)
        if(!carritoporId) return "carrito no encontrado"
        let ProductsById = await productoT.exist(productid)
        if(!carritoporId) return "producto no encontrado"
        let cartT = await this.read()
        let cartfiltro = cartT.filter((cart) => cart.id != carritoporId)
        if(carritoporId.products.some((prod) => prod.id === productid)){
            let sumadeprodinC = carritoporId.products.find((prod) => prod.id === productid);
            sumadeprodinC.cantidad ++;
            let cartC = [carritoporId, ...cartfiltro]
            await this.write(cartC)
            return "se sumo el producto al carrito"
        }

        let sumadeprodinC = carritoporId.products.push({id:ProductsById.id, cantidad : 1})
        carritoporId.products.push({id:ProductsById.id, cantidad : 1})
        let cartC = [carritoporId, ...cartfiltro]

        await this.write(cartC)
        return "Producto agregado al carrito"
    }
}
export default CartManager