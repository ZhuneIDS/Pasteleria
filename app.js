// Importar los módulos necesarios
const express = require('express');
const mongoose = require('mongoose'); // Para la conexión con MongoDB
const path = require('path'); // Para manejar rutas de archivos
require('dotenv').config(); // Para cargar variables de entorno
const jwt = require('jsonwebtoken'); // Para trabajar con JWT
const bcrypt = require('bcryptjs'); // Para manejar contraseñas

// Inicializar la aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the 'front' directory
// Serve static files from the 'front' directory
app.use(express.static(path.join(__dirname, '../front')));

// Definir el esquema para la colección "proyectos"
const proyectoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, required: true }
});

// Crear el modelo para la colección
const Proyecto = mongoose.model('Proyecto', proyectoSchema, 'desarrollofullstack');

// Cargar la URI de conexión desde las variables de entorno
const uri = process.env.MONGO_URI || 'mongodb+srv://yeya:****@cluster0.8jrviyb.mongodb.net/desarrollofullstack?retryWrites=true&w=majority';



// Conectar a MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB Atlas:', err));

// Middleware para analizar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Middleware de protección con JWT
const protect = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Acceso denegado, no hay token' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Usando la clave secreta "Miku"
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Token no válido' });
  }
};

// --- Rutas CRUD ---

// Crear un nuevo proyecto (Create)
app.post('/proyectos', protect, async (req, res) => { // Proteger ruta con JWT
  console.log("Llamando POST /proyectos");
  console.log("Datos recibidos:", req.body);

  const { name, description, status } = req.body;

  if (!name || !description || !status) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    const nuevoProyecto = new Proyecto({ name, description, status });
    await nuevoProyecto.save();
    res.status(201).json({ message: 'Proyecto creado', proyecto: nuevoProyecto });
  } catch (err) {
    res.status(400).json({ error: 'Error al crear el proyecto', details: err });
  }
});

// Obtener todos los proyectos (Read)
app.get('/proyectos', async (req, res) => {
  try {
    const proyectos = await Proyecto.find({});
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener proyectos', details: err });
  }
});

// Obtener un proyecto por ID (Read - individual)
app.get('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener el proyecto', details: err });
  }
});

// Actualizar un proyecto (Update)
app.put('/proyectos/:id', async (req, res) => {
  const { name, description, status } = req.body;

  try {
    const proyecto = await Proyecto.findByIdAndUpdate(
      req.params.id,
      { name, description, status },
      { new: true }
    );
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto actualizado', proyecto });
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar el proyecto', details: err });
  }
});

// Eliminar un proyecto (Delete)
app.delete('/proyectos/:id', async (req, res) => {
  try {
    const proyecto = await Proyecto.findByIdAndDelete(req.params.id);
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json({ message: 'Proyecto eliminado' });
  } catch (err) {
    res.status(400).json({ error: 'Error al eliminar el proyecto', details: err });
  }
});

// Servir el archivo HTML para la ruta principal
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../front/index.html'));
// });

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
