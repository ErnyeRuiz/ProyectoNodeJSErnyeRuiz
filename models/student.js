const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    cedula: String,
    carrera: String
});

module.exports = mongoose.model('students',studentSchema);