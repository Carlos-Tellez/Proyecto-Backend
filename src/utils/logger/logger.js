import winston from "winston"

// Define los colores personalizados para cada nivel

const customColors = {
    fatal: "bold red",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "white",
};

// Crea un nuevo formato con colores personalizados

const logFormat = winston.format.combine(
    winston.format.colorize({ all: true, colors: customColors }),
    winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
);

// Configura los niveles personalizados

const logLevels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

// Crea el logger y configura los transportes (archivos y consola)

const logger = winston.createLogger({
    levels: logLevels,
    level: "info", // Nivel mínimo de los mensajes que se registrarán
    format: winston.format.combine(winston.format.timestamp(), logFormat),
    transports: [
        new winston.transports.Console(), // Imprimir mensajes en la consola
        new winston.transports.File({
        filename: "app.log" ,
        level: "info"
    }), // Guardar mensajes en un archivo "app.log"
    new winston.transports.File({ 
        filename: "errors.log",
        level: "error", // Transporte específico para logs de nivel "error" y "fatal"
    }),
    ],
});

export default  logger;