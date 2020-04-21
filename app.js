require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const hbs = require('hbs');
const mongoose = require('mongoose');
const path = require('path');
const logger = require('morgan');

// // BASIC AUTH
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// // PASSPORT
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

//MONGODB connection
mongoose.connect(process.env.MONGODB_ATLAS, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(x => {
        console.log(`
    Sacada do Prédio está conectada ao MongoDB.
    ==========================================
    Nome da DB: ${x.connections[0].name}
    `)
    })
    .catch(error => console.log('Erro ao conectar na DB ', error));

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

// BASIC AUTH MIDDLEWARE SETUP

app.use(session({
    secret: process.env.SESSION_SECRET,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: 24 * 60 * 60 // 1 day
    }),
    rolling: true,
    resave: false,
    saveUninitialized: true
}));

// passport
passport.serializeUser((user, cb) => {
    cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

// adding flash to be used with passport
app.use(flash()); 

// passport local strategy
passport.use(new LocalStrategy({
    passReqToCallback: true
}, (req, email, password, next) => {
    User.findOne({
        email
    }, (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('email not found')
            return next(null, false, {
                message: req.flash("Incorrect email or password"
            )});
        }
        if (!bcrypt.compareSync(password, user.password)) {
            console.log('incorrect password')
            return next(null, false, {
                message: "Incorrect email or password"
            });
        }
        // on success
        return next(null, user);
    });
}));

// PASSPORT GOOGLE STRATEGY

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_AUTH_ID,
    clientSecret: process.env.GOOGLE_AUTH_SECRET,
    callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    // to see the structure of the data in received response:
    // console.log("Google account details:", profile);

    User.findOne({
            googleID: profile.id
        })
        .then(user => {
            if (user) {
                done(null, user);
                return;
            }

            User.create({
                    googleID: profile.id,
                    username: profile.name.givenName,
                    email: profile.emails[0].value,
                    imageUrl: profile.photos[0].value
                })
                .then(newUser => {
                    done(null, newUser);
                })
                .catch(err => done(err)); // closes User.create()
        })
        .catch(err => done(err)); // closes User.findOne()
}));

app.use(passport.initialize());
app.use(passport.session());

//SASS COMPILING

app.use(require('node-sass-middleware')({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    sourceMap: true
}));

//VIEW SETUP (HBS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

hbs.registerHelper('ifUndefined', (value, options) => {
    if (arguments.length < 2) {
        throw new Error('Handlebars helper "ifUndefined" needs one parameter!');
    }

    if (typeof value !== undefined) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

//HBS helper
hbs.registerHelper('if_eq', function (a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});

hbs.registerPartials(__dirname + '/views/partials');

//Routes

const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth');
app.use('/', auth);

const dashboard = require('./routes/dashboard');
app.use('/', dashboard);

const register = require('./routes/register');
app.use('/', register);

const api = require('./routes/api');
app.use('/', api);

const user = require('./routes/user');
app.use('/', user);

const caseRoutes = require('./routes/case');
app.use('/', caseRoutes);


module.exports = app;