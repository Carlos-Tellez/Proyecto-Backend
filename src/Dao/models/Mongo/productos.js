import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "productos"

const productSchema = new mongoose.Schema({

    id: { type: String, require: true },
    title: { type: String, require: true },
    description: { type: String, require: true },
    category: { type: String, ref: "Category", require: true },
    price: { type: Number, require: true },
    stock: { type: Number, require: true },
    incart: {type: Number, default: 0 }

})


productSchema.plugin(mongoosePaginate);
export const ProductModel = mongoose.model(productCollection, productSchema )
export default {productSchema}