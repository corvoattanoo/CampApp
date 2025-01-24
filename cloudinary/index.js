const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp', // Cloudinary'de oluşturulacak klasör adı
        allowed_formats: ['jpeg', 'png', 'jpg'], // İzin verilen dosya türleri
    },
})

module.exports = {
    cloudinary,
    storage
}