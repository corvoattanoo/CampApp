const express = require('express')
const router = express.Router()
const campgrounds = require('../controllers/campgrounds')
const catchAsync = require('../utilities/catchAsync')
const Campground = require('../models/campground')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware')
const multer  = require('multer')
const {storage} = require('../cloudinary/index')
const upload = multer({storage})
//dest: 'uploads/' storage for local

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('campground[image]'), validateCampground,  catchAsync(campgrounds.createCampground))
    // .post(upload.array('campground[image]') ,(req, res) => {
    //     console.log(req.body,req.files)
    //     res.send('hello')
    // })


router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    .get( catchAsync(campgrounds.showCampground))
    .put( isLoggedIn, isAuthor, upload.array('campground[image]'),validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isAuthor, catchAsync(campgrounds.deleteCampground))

//method override kullan
router.get('/:id/edit',  isLoggedIn,isAuthor, catchAsync(campgrounds.renderEditForm))


module.exports = router