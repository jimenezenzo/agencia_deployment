import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';
import Dotenv from 'dotenv';
Dotenv.config({path: 'variables.env'});

const app = express();
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0';

db.authenticate()
    .catch(() => {
        console.log('Base de datos conectado')
    })
    .catch(error => {
        console.log(error)
    })

app.set('view engine', 'pug');

app.use((req, res, next) => {
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    next();
})

app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));

app.use('/', router);

app.listen(port, host,() => {
    console.log(`El servidor esta funcionando en el puerto ${port} y en el host ${host}`)
})