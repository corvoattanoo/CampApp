const mongoose = require('mongoose');
const Review = require('./review');
const { string } = require('joi');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
})

ImageSchema.virtual('thumbnail').get(function(){
   return this.url.replace('/upload', '/upload/w_200')
})

const campgroundSchema = new Schema({
    title: String,
    images: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type: {
            type: String, // GeoJSON türü: "Point"
            enum: ['Point'], // Sadece "Point" türü kabul edilir
            required: true
        },
        coordinates: {
            type: [Number], // Koordinatlar: [longitude, latitude]
            required: true
        }
    },
    author: {
            type: Schema.Types.ObjectId,
            ref: 'User'
            },
    reviews: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Review'
        //ref to model name
    }
    ]
})

campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Campground', campgroundSchema)
