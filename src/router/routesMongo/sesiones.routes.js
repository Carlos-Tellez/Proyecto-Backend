import { Router } from "express";
import usuarioModel from "../../DAO/models/Mongo/usuarios.js"
import passport from "passport"


import nodemailer from "nodemailer"
import { generateRandomToken, hashPassword, createHash } from "../../utils.js";

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
        rol: req.user.rol
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

sesiones.post("/olvidocontrasena", async (req, res) => {
    try {
        const { email } = req.body;

      // Verificar si el usuario existe en la base de datos
        const user = await usuarioModel.findOne({ email });

        if (!user) {
            return res.status(404).send({ status: "error", error: "Usuario no encontrado" });
        }

      // Generar un token de restablecimiento de contraseña
        const token = generateRandomToken();

      // Actualizar el campo 'resetPasswordToken' en la base de datos
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // Expira en una hora (3600000 ms)

    await user.save();

      // Enviar un correo electrónico con el enlace de restablecimiento de contraseña
        const transporter = nodemailer.createTransport({
        // Configuración del transporte de correo (puedes usar otros proveedores como Gmail, SendGrid, etc.)

        service: 'gmail',
        port: 587,
        secure: false,
        auth: {
            user: "adminback@gmail.com",
            pass: "bcyfzycbidctpo",
        },
    });

    const mailOptions = {
        from: "adminback@gmail.com",
        to: email,
        subject: "Restablecimiento de contraseña",
        text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:8080/sesiones/reset-password/${token}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Error al enviar el correo electrónico", error);
            return res.status(500).send({ status: "error", error: "Error al enviar el correo electrónico" });
        }

        console.log("Correo electrónico enviado:", info.response);
        res.send({ status: "success", message: "Correo electrónico enviado con el enlace de restablecimiento de contraseña" });
    });
    } catch (error) {
        console.log("Error al solicitar el restablecimiento de contraseña", error);
        res.status(500).send({ status: "error", error: "Error al solicitar el restablecimiento de contraseña" });
    }
});

sesiones.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

      // Buscar el usuario por el token de restablecimiento de contraseña
        const user = await usuarioModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verificar si el token no ha expirado
    });

        if (!user) {
            return res.status(400).send({ status: "error", error: "El token es inválido o ha expirado" });
        }

      // Actualizar la contraseña del usuario y eliminar el token de restablecimiento
        user.password = createHash(password);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

    await user.save();

        res.send({ status: "success", message: "Contraseña restablecida exitosamente" });
    } catch (error) {
        console.log("Error al restablecer la contraseña", error);
        res.status(500).send({ status: "error", error: "Error al restablecer la contraseña" });
    }
});


sesiones.get("/reset-password/:token", async (req, res) => {
    const { token } = req.params;

    try {
          // Buscar el usuario en la base de datos por el token de restablecimiento de contraseña
    const user = await usuarioModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Verificar si el token no ha expirado
    });

        if (!user) {
            // Si el usuario no existe o el token ha expirado, mostrar un mensaje de error
            return res.status(400).send({ status: "error", error: "El token es inválido o ha expirado" });
        }


    res.render("reset", { token });
    } catch (error) {
        console.log("Error al procesar el enlace de restablecimiento de contraseña", error);
        res.status(500).send({ status: "error", error: "Ha ocurrido un error al procesar el enlace de restablecimiento de contraseña" });
    }
});

export default sesiones