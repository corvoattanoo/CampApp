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
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(places)} ${sample(descriptors)}`,
            image: `https://picsum.photos/400?random=${Math.random()}`,
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


