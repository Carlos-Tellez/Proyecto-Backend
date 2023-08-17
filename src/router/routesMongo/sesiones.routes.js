import { Router } from "express";
import usuarioModel from "../../DAO/models/Mongo/usuarios.js"
import passport from "passport"

const sesiones = Router();


sesiones.post("/registro", passport.authenticate("registro", {failureRedirect: "/"}) ,async (req,res)=> {
    res.send({status:"success", message: "Usuario registrado"})
});

sesiones.post("/login", passport.authenticate("login", {failureRedirect: "/"}),async (req,res)=> {

    if(!req.user) return res.status(400).send({ status: "error", error: "Credenciales invalidades"})
    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        email: req.user.email,
    }
    res.send({ status: "success", payload: req.user});

});

sesiones.post("/regis", (req,res)=> {


    res.send({status:"success"})
});


sesiones.post("/logout", (req,res)=> {
    req.session.destroy()

    res.send({status:"success"}).redirect("/")
});

export default sesiones