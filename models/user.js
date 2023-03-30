const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

    nombre: String,
    apellido: String,
    correo: String,
    contraseña: String
});

module.exports = mongoose.model('users',userSchema);