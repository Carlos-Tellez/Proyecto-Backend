import { Router } from "express";
import MensajesManagerM from "../../DAO/DBManagers/Mongo/mensajes.js"
import { authorization } from "../../config/passport.config.js"
import passport from "passport"


const ChatR = Router();
const MensajesManager = new MensajesManagerM();


ChatR.get("/",passport.authenticate("login", {failureRedirect: "/"}),  authorization('admin'), async (req,res) =>{
    res.render("chat")
});

export default ChatR