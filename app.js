const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoute = require('./routes/persona.route');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personasRoute);

mongoose.connect('mongodb+srv://20233tn139:20233tn139@apaez.gvuvq.mongodb.net/Test?retryWrites=true&w=majority&appName=Apaez', {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    console.log('Conexión exitosa a la base de datos a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    })
    .catch((err) => console.log('Error al conectar en MongoDB', err));


    