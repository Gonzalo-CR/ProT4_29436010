// Middleware de manejo global de errores
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    
    if (err.type === 'ValidationError') {
        return res.status(400).json({ message: err.message });
    }
    
    res.status(500).json({ message: 'Ocurrió un error interno en el servidor' });
};