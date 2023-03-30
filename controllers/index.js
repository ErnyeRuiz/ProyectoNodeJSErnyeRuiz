//aca manejamos todos los pedidos del navegador
//actualmente no se estan usando los controladores


const userSchema = require('../models/user')
const studentSchema = require('../models/student')

export const newUser = async (req, res) => { //metodo para agregar usuario a la base de datos
    try {        
        const user = new userSchema({
        nombre: req.body.txtNombre,
        apellido: req.body.txtApellidos,
        correo: req.body.txtCorreo,
        contraseña: req.body.txtContraseña
        });        
        await user.save();
        console.log('Se agregó un usuario nuevo');
        res.render('index');  
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};

export const newStudent = async (req, res) => { //metodo para agregar usuario a la base de datos
    try {        
        const student = new studentSchema({
        nombre: req.body.txtNombre,
        apellido: req.body.txtApellido,
        cedula: req.body.txtCedula,
        carrera: req.body.txtCarrera
        });        
        await student.save();
        console.log('Se agregó un nuevo estudiante');
        res.render('principal');  
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
};
