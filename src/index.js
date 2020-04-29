const express = require('express');
const path = require('path');
const exphbs =  require('express-handlebars');
const methodOverride = require('method-override');
const session =  require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const bodyParser = require('body-parser');


//Inicializaciones
const app = express();
require('./config/passport');

//Settings Configuraciones
app.set('port', 3003); //Para que use otro que no sea el 3000 = process.env.PORT || 3000
app.use(bodyParser());
app.set('views', path.join(__dirname, 'views')); //para decirle a node que views
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'), //codigo que se puede reutilizar en otras vistas
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares Ejecutadas antes del Servidor o antes de Rutas
app.use(express.urlencoded({ extended:false }));//para codificar
app.use(methodOverride('_method'));// para usar put y delet en los formularios
app.use(session({ //para usar variables de session
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
    res.locals.succes_msg = req.flash('succes_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error_msg');
    next();
});

// Routes
app.use(require('./routes/index.js'));

// Static Filesa
app.use(express.static(path.join(__dirname, 'public')));


// Server is Listening
app.listen(app.get('port'), ()=> {
    console.log('----------------------------------------Servidor en puerto -> ', app.get('port'));
});