# PET-PALS
Final project for EE-547

Pet-pals is a social platform designed exclusively for pet parents to share adventures of furry friends, connect with like-minded people individuals and discover nearby pet related resources with ease. With personalized recommendations and a fun caption-generating chat-bot, this app makes it easy to bring joy and convenience to every pet lover's journey. 

## Setup instructions
- Clone github repository
- Set directory to backend
- Edit keys.js and dotenv file in backend folder for Mongo DB and AWS S3 credentials
- Build docker image and run container
- Set directory to frontend
- Install packages using **npm install package.json**
- Start the React app using **npm start**

## Repository Structure

### Backend

- **Models**
  - `info.js`: MongoDB model for profile metadata
  - `model.js`: MongoDB model for storing user registration
  - `post.js`: MongoDB model for storing shared post data

- **Routes**
  - `auth.js`: API endpoint for sign up and sign in
  - `create.js`: API endpoint for sharing and retrieving posts
  - `find.js`: API endpoint for finding local resources using Google Map API
  - `s3.js`: Defines methods for saving and retrieving data from AWS S3
  - `update.js`: API endpoint for updating and retrieving profile

- `app.js`: Exporting all endpoints

### Frontend

- **src**
  - **Components**
    - `CreatePost.js`: Sharing Media
    - `findnearby.js`: Finding local resources using local API
    - `Home.js`: Page for displaying all retrieved posts
    - `Modal.js`: Logout feature
    - `Navbar.js`: Navigation bar for different options
    - `Profile.js`: Page for updating profile data
    - `SignIn.js`: Page for sign-in
    - `SignUp.js`: Page for sign-up

- `App.js`: Importing all components and launching the app




