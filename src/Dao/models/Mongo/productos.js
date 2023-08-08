import mongoose from "mongoose"

const productCollection = "productos"

const productSchema = new mongoose.Schema({

    id: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, ref: "Category", require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },

})

export const ProductModel = mongoose.model(productCollection, productSchema )