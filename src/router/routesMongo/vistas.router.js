import { Router } from "express";

const vistas = Router()


vistas.get("/registro", (req,res)=>{

    res.render("registro")
});
vistas.get("/", (req,res)=> {

    res.render("login")
});

vistas.get("/perfil", (req,res)=> {

    res.render("perfil", {
        user: req.session.user
    } )
});

vistas.get("/reset-password", (req,res) => {
    res.render("reset_password"); 
});

vistas.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    try {
      // Aquí debes buscar el usuario por el token de restablecimiento de contraseña
      // y verificar si el token es válido y no ha expirado.

      // Si el token es válido, renderiza la vista donde el usuario pueda restablecer su contraseña.
        res.render("reset", { token });
    } catch (error) {
        console.log("Error al procesar el enlace de restablecimiento de contraseña", error);
        res.status(500).send({ status: "error", error: "Ha ocurrido un error al procesar el enlace de restablecimiento de contraseña" });
    }
});


export default vistas