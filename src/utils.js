import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import bcrypt from "bcrypt"


export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname;

// Generar un token aleatorio para restablecer la contraseña
export const generateRandomToken = () => {
    const length = 32;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        token += characters[randomIndex];
    }

    return token;
};

  // Hashear la contraseña utilizando bcrypt
    export const hashPassword = (password) => {
        const saltRounds = 10;
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    };