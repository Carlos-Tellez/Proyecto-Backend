import jwt from 'jsonwebtoken';

// Función de middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
  // Obtener el token de los headers de la solicitud
    const token = req.headers['authorization']?.split(' ')[1];

      // Si el token no está presente, devolver "Usuario no autorizado"
    if (!token) {
        return res.status(401).json({ status: 'error', error: 'Usuario no autorizado' });
    }

    try {
        // Verificar si el token es válido y obtener el payload (datos del usuario)
        const payload = jwt.verify(token, 'mi_secreto');

        // Agregar el payload a la solicitud para que pueda ser utilizado en rutas posteriores
        req.user = payload;

        // Continuar con la ejecución de la siguiente función en la cadena de middleware
        next();
    } catch (error) {
        // Si el token no es válido, devolver "Usuario no autorizado"
        return res.status(401).json({ status: 'error', error: 'Usuario no autorizado' });
    }
};

export default authenticateToken;