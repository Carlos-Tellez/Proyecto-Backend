import { Router } from "express";
import MensajesManagerM from "../../DAO/DBManagers/Mongo/mensajes.js"

const ChatR = Router();
const MensajesManager = new MensajesManagerM();


ChatR.get("/", async (req,res) =>{
    res.render("chat")
});

export default ChatR