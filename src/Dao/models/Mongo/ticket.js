import mongoose from "mongoose";


const collection = "ticket"


const ticketSchema = new mongoose.Schema({

    id_carrito: {type: String, require: true} ,

    purchase_date: { type: Date, default: Date.now },
    amount: String,
    email: String  

})


export const ticketModel = mongoose.model(collection, ticketSchema)