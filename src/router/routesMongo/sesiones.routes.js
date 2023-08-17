import { Router } from "express";
import usuarioModel from "../../DAO/models/Mongo/usuarios.js"

const sesiones = Router();


sesiones.post("/registro", async (req,res)=> {
    const result = await usuarioModel.create(req.body)
    res.send({status:"success", payload: result})
});

sesiones.post("/login", async (req,res)=> {

    const {email, password} = req.body;

    const user = await usuarioModel.findOne({email, password});
    if(user) {

        req.session.user = {
            name: `${user.first_name} ${user.last_name}`,
            email: user.email
        }
        return res.send({status:"success"})

    } else { 

        return res.send({status:"error", error: "Usuario o contraseña incorrectos"})
    }

});

sesiones.post("/regis", (req,res)=> {


    res.send({status:"success"})
});


sesiones.post("/logout", (req,res)=> {
    req.session.destroy()

    res.send({status:"success"}).redirect("/")
});

export default sesiones