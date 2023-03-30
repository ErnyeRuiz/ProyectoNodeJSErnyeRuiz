const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
require("dotenv").config();

const routes = require('./routes/index');//para utilizar las rutas de forma ordenada

// settings
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname,'views')); //la carpeta views esta en la raiz y se llama views
app.set('view engine','pug');
//middlewares
app.use((req,res,next)=>{
    console.log(`${req.url} -${req.method}`);
    next();
    //lo que hacemos es indicar en consola que esta pidieindo el usuario
}); 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//routes
app.use(routes);

//static files
app.use(express.static(path.join(__dirname,'public')));

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.ybf5izn.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {
        useNewUrlParser:true, useUnifiedTopology:true
    })
    .then(() => console.log("Base de datos conectada"))
    .catch(e=>console.log(e))

//start the server
app.listen(app.get('port'),() =>{
    console.log("Servidor iniciado en puerto",app.get('port'))
});
