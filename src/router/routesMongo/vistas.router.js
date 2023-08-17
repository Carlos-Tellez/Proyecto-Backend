import { Router } from "express";

const vistas = Router()


vistas.get("/registro", (req,res)=>{

    res.render("registro")
})
vistas.get("/", (req,res)=> {

    res.render("login")
})

vistas.get("/perfil", (req,res)=> {

    res.render("perfil", {
        user: req.session.user
    } )
})
export default vistas