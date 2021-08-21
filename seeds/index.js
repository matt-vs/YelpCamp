const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelpcamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const camp = new Campground({
            author: '60aaefcc94870f34dc1d2eeb',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt doloremque excepturi assumenda ad, labore reiciendis exercitationem laborum sed porro quaerat deserunt quas. Ipsum impedit officiis quos omnis repudiandae inventore maxime!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dl2qctmxu/image/upload/v1622069297/YelpCamp/fg3osjjj5je5wp6tzaqr.jpg',
                    filename: 'YelpCamp/fg3osjjj5je5wp6tzaqr'
                },
                {
                    url: 'https://res.cloudinary.com/dl2qctmxu/image/upload/v1622069297/YelpCamp/mboncmbfwxseqpjkn8th.jpg',
                    filename: 'YelpCamp/mboncmbfwxseqpjkn8th'
                }
            ]

        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
});