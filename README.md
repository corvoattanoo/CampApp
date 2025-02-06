# Campground Project

## Project Overview

This project is a web application that allows users to browse, create, and manage campgrounds. Users can also add reviews and photos to campgrounds, while also seeing their location on a map using Mapbox.

### Technologies Used:
- **Node.js** for backend
- **Express.js** for routing
- **MongoDB** for database
- **Mapbox** for geolocation and maps
- **Cloudinary** for image uploads
- **Multer** for handling file uploads

## Features

- **CRUD operations** for campgrounds (Create, Read, Update, Delete).
- **Map Integration**: Displays campgrounds on a map using Mapbox.
- **User Authentication**: Registration and login functionalities with secure authentication.
- **Reviews**: Users can create, view, and delete reviews for campgrounds.
- **Image Uploads**: Campgrounds can have images uploaded via Cloudinary.
- **Validation**: Form validation for campground and review submissions.

---

## Setup Instructions

To run this project locally, follow these steps:

### 1. Clone the Repository

git clone https://github.com/corvoattanoo/CampApp

### 2. Install dependencies

npm install @mapbox/mapbox-sdk@^0.16.1 cloudinary@^1.41.3 connect-flash@^0.1.1 dms-conversion@^3.1.3 dotenv@^16.4.7 ejs@^3.1.10 ejs-mate@^4.0.0 express@^4.21.1 express-session@^1.18.1 gsap@^3.12.5 joi@^17.13.3 method-override@^3.0.0 mongoose@^8.8.3 multer@^1.4.5-lts.1 multer-storage-cloudinary@^4.0.0 passport@^0.7.0 passport-local@^1.0.0 passport-local-mongoose@^8.0.0

### 3. Create a .env file and configure the necessary variables:

CLOUDINARY_CLOUD_NAME
CLOUDINARY_KEY
CLOUDINARY_SECRET
MAPBOX_TOKEN

---
## Start the Development Server

Run the following command to start the server: node app.js
The app should now be running at http://localhost:3000/

--------------------------------

## API Endpoints

### Campgrounds
GET /campgrounds – List all campgrounds
POST /campgrounds – Create a new campground
GET /campgrounds/:id – View a single campground
PUT /campgrounds/:id – Update a campground
DELETE /campgrounds/:id – Delete a campground

### Reviews
POST /campgrounds/:id/reviews – Add a review
DELETE /campgrounds/:id/reviews/:reviewId – Delete a review

### Authentication

GET /register – Registration page
POST /register – Create a new user
GET /login – Login page
POST /login – Authenticate user
GET /logout – Log out user

# Contact

For any questions, reach out to yigit.3f3@gmail.com.

# Yigit Sozer 42283
















