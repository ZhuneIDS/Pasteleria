const mongoose = require('mongoose');

// Definir el esquema
const proyectoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    status: { type: String, required: true }
});

// Crear el modelo
const Proyecto = mongoose.model('Proyecto', proyectoSchema);

module.exports = Proyecto;
