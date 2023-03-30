const express = require('express');
const router = express.Router();
const userSchema = require('../models/user')
const studentSchema = require('../models/student')

//get para devolver al index (login)
router.get('/',(req,res)=>{
    res.render("index");
});

//get para devolver al registro de un nuevo usuario
router.get('/registro',(req,res)=>{
    res.render('registro');
});

//get para devolver a la pantalla principal
router.get('/principal',(req,res)=>{
    res.render('principal');
});

//post para devolver a la pantalla principal
router.post('/principal',(req,res)=>{
    res.render('principal');
});

//metodo post que recibe datos de pantalla registro y agrega el usuario a la base de datos
router.post('/registro', async (req, res) => {
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
});

//metodo post que toma los datos de la view students para agregarlos la base de datos
router.post('/students', async (req, res) => {
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
});

//metodo get que redirecciona a view students con los estudiantes encontrados en la base de datos
router.get('/students', async (req,res) =>{
    try{
        const students = await studentSchema.find({})
        res.render('students',{
            students
        });
    }catch(error){
        console.error(error);
        res.status(500).send('Error');
    }
});

//metodo get que recibe un id de un estudiante seleccionado en view students, redirecciona a la pantalla de edicion
router.get('/editar/:id', async (req,res)=>{
    try {
        const student = await studentSchema.findById(req.params.id)
        res.render('editar',{
            student
        });    
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

//metodo post que trae los datos cambiados en view editar para hacer el cambio en la base de datos
router.post('/editar/guardar/:id',async (req,res)=>{
    try {
        const student = await studentSchema.findByIdAndUpdate(req.params.id,{
            nombre: req.body.txtNombreEdit,
            apellido: req.body.txtApellidoEdit,
            cedula: req.body.txtCedulaEdit,
            carrera: req.body.txtCarreraEdit
        });
        console.log("Id editado >>> ",req.params.id);
                
        console.log('Usuario', req.body.txtNombreEdit, "editado");
        res.render('principal');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }     
});

//metodo get de borrar que tiene el id del estudiante seleccionado para borrar, redireacciona a view para borrar
router.get('/borrar/:id', async (req,res)=>{
    try {
        const student = await studentSchema.findById(req.params.id);
        
        res.render('borrar',{
            student
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error');
    }
});

//metodo post para borrar el estudiante de la base de datos
router.post('/borrar/:id',(req,res)=>{    
    studentSchema.findByIdAndDelete(req.params.id)
        .then((result)=>{
            res.render('principal')
        })
        .catch ((error) =>{
            console.error(error);
            res.status(500).send('Error');
        });                           
});

module.exports = router;