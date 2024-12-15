const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const ejsMate = require('ejs-mate')
const mongoose = require('mongoose');
const Campground = require('./models/campground')
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

app.get('/campgrounds' , async(req, res, next) => {
    const campgrounds = await Campground.find({}) 
    res.render('campgrounds/index.ejs', {campgrounds})
})

app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new.ejs')
})

app.post('/campgrounds' ,async (req,res, next) => {
    try {
        const campground = new Campground(req.body.campground)
        await campground.save()
        res.redirect(`/campgrounds/${campground._id}`)
    } catch (e) {
        next(e)
    }
})

app.get('/campgrounds/:id', async(req, res) => {
    const campground = await Campground.findById(req.params.id)   
    res.render('campgrounds/show', {campground})
    
})

//method override kullan
app.get('/campgrounds/:id/edit', async(req, res) => {
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/edit', {campground})
})

app.put('/campgrounds/:id', async(req, res) => {
//destructure
    const {id} = req.params
//The spread syntax (...) is used to create a shallow copy of the campground object from req.body.
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    res.redirect(`/campgrounds/${campground._id}`)
})
app.delete('/campgrounds/:id' , async(req,res) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    res.redirect('/campgrounds')
})

app.use((err , req , res, next) => {
    res.send('Oh boyy, Something went wrong')
})


app.listen('3000', () => {
    console.log('LISTENING PORT 3000 RN')
})