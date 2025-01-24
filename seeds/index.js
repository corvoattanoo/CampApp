const mongoose = require('mongoose');
const campground = require('../models/campground');
//campground model basics izle 
const cities = require('./cities')
const DmsCoordinates = require('dms-conversion');
const {places, descriptors} = require('./seedHelpers')


mongoose.connect('mongodb://127.0.0.1:27017/camp-app');

const db = mongoose.connection;
db.on('error', err => {
    logError(err);
});
db.once('open', ()=> {
    console.log('database is connected')
})

function sample(arr){
    return arr[Math.floor(Math.random() * arr.length)]
}

const seedDB = async () => {
    await campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10)
        const camp = new campground({
            author: '6789200afd06f1d3fc95f4da',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dkq0m1ryq/image/upload/v1737460099/YelpCamp/g9vbs0bgeqijwuq2r5po.jpg',
                  filename: 'YelpCamp/g9vbs0bgeqijwuq2r5po',
                },
                {
                  url: 'https://res.cloudinary.com/dkq0m1ryq/image/upload/v1737460100/YelpCamp/hcs9bikahjnsfw5q8htn.jpg',
                  filename: 'YelpCamp/hcs9bikahjnsfw5q8htn',
                },
                {
                  url: 'https://res.cloudinary.com/dkq0m1ryq/image/upload/v1737460102/YelpCamp/djc7mss4pziqlnl7t5ui.jpg',
                  filename: 'YelpCamp/djc7mss4pziqlnl7t5ui',
                }
              ],
            price: price,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, fugit ducimus. Quo atque incidunt numquam, impedit voluptas cumque natus expedita esse odio beatae vel saepe, quas officia, mollitia optio possimus!'
        });
        await camp.save();
    }
}

seedDB()
.then(() => {
    console.log("db Unconnected")
    mongoose.connection.close();
})


