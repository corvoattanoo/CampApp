const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const Campground = require('./models/campground')
const {campgroundSchema} = require('./schemas')
const catchAsync = require('./utilities/catchAsync')
const ExpressError = require('./utilities/ExpressError')
//campground model basics izle 
const methodOverride = require('method-override')


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));


mongoose.connect('mongodb://127.0.0.1:27017/camp-app');

const db = mongoose.connection;
db.on('error', err => {
    logError(err);
});
db.once('open', ()=> {
    console.log('database is connected')
})

app.get('/' , (req, res) => {
    res.render('home')
})

const validateCampground = (req, res , next) =>{
    //validation error handling
    const {error} = campgroundSchema.validate(req.body)
    if(error){
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    }else{
        next()
    }
}

app.get('/campgrounds' , catchAsync(async(req, res, next) => {
    const campgrounds = await Campground.find({}) 
    res.render('campgrounds/index.ejs', {campgrounds})
}))

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs')
})

app.post('/campgrounds' ,validateCampground, catchAsync(async (req,res, next) => {
    // if(!req.body.campground) throw new ExpressError('Missing data', 400)

    const campground = new Campground(req.body.campground)
    await campground.save()
    res.redirect(`/campgrounds/${campground._id}`)
}))

app.get('/campgrounds/:id', catchAsync(async(req, res,next) => {
    const campground = await Campground.findById(req.params.id)   
    res.render('campgrounds/show', {campground})   
}))

//method override kullan
app.get('/campgrounds/:id/edit', catchAsync(async(req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
}))

app.put('/campgrounds/:id', validateCampground, catchAsync(async(req, res,next) => {
//destructure
    const {id} = req.params
//The spread syntax (...) is used to create a shallow copy of the campground object from req.body.
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
}))
app.delete('/campgrounds/:id' , catchAsync(async(req,res,next) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
}))

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