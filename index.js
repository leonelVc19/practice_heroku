const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');

require('dotenv').config();
require('./middlewares/auth');

//importacion de los modelos.
const db = require('./models');

//importacion de rutas.
const routes = require('./routes/routes');
const rutasNoProtegidas = require('./routes/rutasNoProtegidas');



//Conexion con la base de datos.
db.sequelize.authenticate()
.then(() => {
    console.log("BD Conectada");
})
.catch((error) => {
    console.log(error);
});


///crear el servidor.
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//cors para el caso ded dar acceso un sitio o dominio. 
//en donde estara ubicado el frontend
app.use(
    cors({
        credentials: true,
        origin:['http://localhost:3000'],
    })
);


//incluir las rutas.

// rutas no protegidas
app.use('/', rutasNoProtegidas());
//carga de imagenes
app.use('/uploads', express.static('uploads'));
// rutas protegidas
app.use('/', passport.authenticate('jwt', { session: false }), routes());


//habilitar puerto de escucha.
/**para llamar las variables de entorno, se les colcoca process.env. y despues con fue nombrada la variable. 
 * La otra opcion.
 * solo colocar el puerto en este caso 5000
 * 
*/
app.listen(process.env.APP_PORT, () => {
    console.log("La aplicación esta en ejecución....");
});
