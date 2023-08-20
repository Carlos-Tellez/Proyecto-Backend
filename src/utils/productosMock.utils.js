import {fakerES as faker} from "@faker-js/faker"

const generateProducts = (n) => {

    const productos = []
    for(let i = 0; i < n ; i++ ) {

        productos.push(generateProduct())
    }

    return productos
}

const generateProduct = () => {

    return {
        id: faker.string.uuid(), 
        titulo: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        category: faker.commerce.productMaterial(),
        price: faker.commerce.price(),
        stock: faker.number.int()

    };
};

export default generateProducts