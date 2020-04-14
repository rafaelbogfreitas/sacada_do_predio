require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

//MONGODB connection
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
})
.then( x => {
    console.log(`
    Sacada do Prédio está conectada ao MongoDB.
    ==========================================
    Nome da DB: ${x.connections[0].name}
    `)
})
.catch( error => console.log('Erro ao conectar na DB ', error ));

//TODO - check line 25/26
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);


//App initialization
const app = express();

//MIDDLEWARE SETUP

//TODO => logger/morgan
app.use(logger('dev'));
//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

//Cookie parser
app.use(cookieParser());

//SASS COMPILING

app.use(require('node-sass-middleware')({
    src:  path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

//VIEW SETUP (HBS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('ifUndefined', (value, options) => {
    if(arguments.length < 2){
        throw new Error('Handlebars helper "ifUndefined" needs one parameter!');
    }

    if(typeof value !== undefined){
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});


//TODO - passport setup

//Routes
const index = require('./routes/index');
app.use('/', index);

//TODO - auth routes

module.exports = app;









