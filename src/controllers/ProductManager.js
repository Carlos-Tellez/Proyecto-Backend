import {promises as fs }from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {

    constructor (){
        this.path = "./src/models/products.json";
    }

    readProducts = async () =>{
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    }

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    }

    exist = async (id) => {
        let products =  await this.readProducts();
        return products.find(prod => prod.id === id)
    }

    addProducts = async (product) => {
        let productsOld = await this.readProducts();
        product.id = nanoid(2)
        let productAll = [...productsOld,product]; 
        await this.writeProducts(productAll);
        return "Producto Agregado";
    };

    getProducts = async () =>{
        return await this.readProducts();
    };

    getProductsById = async (id) =>{
        let productById = await this.exist(id)
        if(!productById) return "Producto No Encontrado"
        return productById
    };

    updateProducts =  async (id,product) => {
        let productById = await this.exist(id)
        if(!productById) return "Producto No Encontrado"
        await this.deleteProducts(id)
        let oldP = await this.readProducts()
        let products = [{...product,id : id}, ...oldP]
        await this.writeProducts(products)
        return "El Producto se Actualizo Correctamente"

    }

    deleteProducts = async (id) => {                      
        let products =  await this.readProducts();
        let existP = products.some(prod => prod.id === id);
        if(existP){
            let filterP = products.filter(prod => prod.id != id);
            await this.writeProducts(filterP)
            return "Producto Eliminado"
        }
        return " El Producto No Existe "
    }
}

export default ProductManager




