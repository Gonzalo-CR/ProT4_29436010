import express from 'express';
import morgan from 'morgan';
import { router } from './routes.js'; 
import cors from 'cors';
import { errorHandler } from './errorHandler.js'; 

const app = express();

// Configuración del puerto
const port = process.env.PORT || 3000;
app.set('port', port);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Rutas de la API
app.use(router);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log(`Server is running on port ${app.get('port')}`);
});

// Manejo de error si el puerto está en uso
app.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`El puerto ${port} está en uso, intentando con otro puerto...`);
        app.listen(port + 1);
    } else {
        throw err;
    }
});
