if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

//console.log(process.env.SECRET) 
//console.log(process.env.API_KEY) 

const express = require('express')
const app = express()
const path = require('path')
const ejsMate = require('ejs-mate')
const session = require('express-session') 
const flash = require('connect-flash')
const mongoose = require('mongoose');
const ExpressError = require('./utilities/ExpressError')
//campground model basics izle 
const methodOverride = require('method-override')
const passport = require('passport')
const LocalStrategy = require('passport-local');
const User = require('./models/user')

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')
const mongoSanitize = require('express-mongo-sanitize');

mongoose.connect('mongodb://127.0.0.1:27017/camp-app');
const db = mongoose.connection;
db.on('error', err => {
    logError(err);
});
db.once('open', ()=> {
    console.log('database is connected')
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
//ne ise yaradigina bak
//app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(mongoSanitize())


//tekrar et session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig))
app.use(flash())

//implementing passport
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    //console.log(req.query)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})



app.use('/campgrounds', campgroundRoutes)
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)


app.get('/' , (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page not found', 404))
})

app.use((err , req , res, next) => {
    const {message = 'Something went wrong', statusCode = 500} = err
    res.status(statusCode).render('error.ejs', {err})
})


app.listen('3000', () => {
    console.log('LISTENING PORT 3000 RN')
})