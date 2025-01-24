const joi = require('joi')

module.exports.campgroundSchema = joi.object({
    campground:joi.object({
        title: joi.string().required(),
        price: joi.number().required().min(0),
        location: joi.string().required(),
        // images: joi.array().items(
        //     joi.object({
        //         url: joi.string().uri().required(), // Ensures the URL is a valid URI
        //         filename: joi.string().required()
        //     })
        // ).required(),
        description: joi.string().required(),
        

    }).required(),
    deleteImages: joi.array()
})

module.exports.reviewSchema = joi.object({
    review: joi.object({
        rating: joi.number().required().min(1).max(5),
        body: joi.string().required()
    }).required()
})