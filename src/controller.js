import { pool } from './database.js';

// Función de validación de datos
const validateLibroData = (data) => {
    const { nombre, autor, categoria, 'año-publicacion': añoPublicacion, ISBN } = data;

    if (typeof nombre !== 'string' || nombre.trim() === '') {
        throw { type: 'ValidationError', message: 'El campo "nombre" es obligatorio y debe ser una cadena de texto.' };
    }
    if (typeof autor !== 'string' || autor.trim() === '') {
        throw { type: 'ValidationError', message: 'El campo "autor" es obligatorio y debe ser una cadena de texto.' };
    }
    if (typeof categoria !== 'string' || categoria.trim() === '') {
        throw { type: 'ValidationError', message: 'El campo "categoria" es obligatorio y debe ser una cadena de texto.' };
    }
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(añoPublicacion)) {
        throw { type: 'ValidationError', message: 'El campo "año-publicacion" debe ser una fecha en formato ISO 8601.' };
    }
    if (typeof ISBN !== 'string' || ISBN.length !== 13) {
        throw { type: 'ValidationError', message: 'El campo "ISBN" es obligatorio, debe ser una cadena de texto, y debe tener 13 caracteres.' };
    }
};

class BibliotecaController {
    // Obtener todos los libros
    async getAll(req, res, next) {
        try {
            const [rows] = await pool.query('SELECT * FROM libros');
            res.json(rows);
        } catch (err) {
            next(err); 
        }
    }

    // Obtener un libro por ID
    async getOne(req, res, next) {
        const { id } = req.params;
        try {
            const [rows] = await pool.query('SELECT * FROM libros WHERE id = ?', [id]);
            if (rows.length === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json(rows[0]);
        } catch (err) {
            next(err); 
        }
    }

    // Crear un nuevo libro
    async create(req, res, next) {
        try {
            validateLibroData(req.body); 

            const { nombre, autor, categoria, 'año-publicacion': añoPublicacion, ISBN } = req.body;

            // Verificar si el ISBN ya existe
            const [rows] = await pool.query('SELECT * FROM libros WHERE ISBN = ?', [ISBN]);
            if (rows.length > 0) {
                return res.status(400).json({ message: 'El ISBN ya existe. Debe ser único.' });
            }

            // Insertar el nuevo libro si el ISBN es único
            const [result] = await pool.query(
                'INSERT INTO `libros` (`nombre`, `autor`, `categoria`, `año-publicacion`, `ISBN`) VALUES (?, ?, ?, ?, ?)',
                [nombre, autor, categoria, añoPublicacion, ISBN]
            );
            res.json({ "Id insertado": result.insertId });
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El ISBN ya existe. Debe ser único.' });
            }
            next(err); 
        }
    }

    // Actualizar un libro por ID
    async update(req, res, next) {
        try {
            validateLibroData(req.body); 

            const { id } = req.params;
            const { nombre, autor, categoria, 'año-publicacion': añoPublicacion, ISBN } = req.body;

            const [result] = await pool.query(
                'UPDATE libros SET nombre = ?, autor = ?, categoria = ?, `año-publicacion` = ?, ISBN = ? WHERE id = ?',
                [nombre, autor, categoria, añoPublicacion, ISBN, id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json({ message: 'Libro actualizado correctamente' });
        } catch (err) {
            next(err); 
        }
    }

    // Eliminar un libro por ISBN
    async delete(req, res, next) {
        const { ISBN } = req.params;
        try {
            const [result] = await pool.query('DELETE FROM libros WHERE ISBN = ?', [ISBN]);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Libro no encontrado' });
            }
            res.json({ message: 'Libro eliminado correctamente' });
        } catch (err) {
            next(err); 
        }
    }
}

export const biblioteca = new BibliotecaController();
