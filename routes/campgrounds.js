const express = require('express')
const router = express.Router()
const catchAsync = require('../utilities/catchAsync')
const ExpressError = require('../utilities/ExpressError')
const Campground = require('../models/campground')
const {campgroundSchema} = require('../schemas')
const {isLoggedIn} = require('../middleware')



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

router.get('/' , catchAsync(async(req, res, next) => {
    const campgrounds = await Campground.find({}) 
    res.render('campgrounds/index.ejs', {campgrounds})
}))

router.get('/new', isLoggedIn,(req, res) => { 
    res.render('campgrounds/new')
})

router.post('/' ,isLoggedIn,validateCampground, catchAsync(async (req,res, next) => {
    // if(!req.body.campground) throw new ExpressError('Missing data', 400)

    const campground = new Campground(req.body.campground)
    await campground.save()
    req.flash('success', 'successfully made a new campground!')
    res.redirect(`/campgrounds/${campground._id}`)
}))

router.get('/:id', catchAsync(async(req, res,next) => {
    const campground = await Campground.findById(req.params.id).populate('reviews');
    if(!campground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/show', {campground})   
}))

//method override kullan
router.get('/:id/edit',  isLoggedIn, catchAsync(async(req, res, next) => {
    const campground = await Campground.findById(req.params.id)
    if(!campground){
        req.flash('error', 'Cannot find that campground')
        return res.redirect('/campgrounds')
    }
    res.render('campgrounds/edit', {campground})
}))

router.put('/:id', validateCampground, catchAsync(async(req, res,next) => {
//destructure
    const {id} = req.params
//The spread syntax (...) is used to create a shallow copy of the campground object from req.body.
    const campground = await Campground.findByIdAndUpdate(id, {...req.body.campground})
    req.flash('success', 'Successfully updated campground')
    res.redirect(`/campgrounds/${campground._id}`)
}))
router.delete('/:id' , catchAsync(async(req,res,next) => {
    const {id} = req.params
    await Campground.findByIdAndDelete(id)
    req.flash('success', 'Campground deleted successfully')
    res.redirect('/campgrounds')
}))


module.exports = router