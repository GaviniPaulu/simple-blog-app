// Load environment variables from a .env file (if you're using dotenv for sensitive info)
// If you're not using dotenv, you can remove this line and directly put your MONGODB_URI.
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const path = require('path');        // For handling file paths
const methodOverride = require('method-override'); // For PUT/DELETE from HTML forms

const app = express(); // Initialize Express application
const PORT = process.env.PORT || 3000; // Define the port your server will run on

// --- MongoDB Atlas Connection ---
// Use your actual MongoDB Atlas connection string here.
// It's highly recommended to use process.env.MONGO_URI if you set it up in a .env file.
const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://gavinipaulu:paulu319@cluster0.8oovpam.mongodb.net/simpleblog?retryWrites=true&w=majority&appName=Cluster0';
// Make sure to replace 'paulu319' with your ACTUAL password if you're not using a .env file.
// Also, I've added '/simpleblog' to the URI to specify the database name within your cluster.

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB Atlas Connected Successfully!');
    })
    .catch(err => {
        console.error('MongoDB Atlas connection error:', err);
        console.error('Error details:', err.message); // Log the specific error message
        // Optionally, exit the process if the database connection is critical for the app to run
        // process.exit(1);
    });
// --- End MongoDB Atlas Connection ---

// --- Express Middleware Setup ---
// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));
// Middleware to parse JSON bodies (for API requests if you add them later)
app.use(express.json());
// Middleware for method override, allows PUT/DELETE requests from HTML forms
app.use(methodOverride('_method'));
// Middleware to serve static files (like CSS, client-side JS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
// Set the directory where your EJS template files are located
app.set('views', path.join(__dirname, 'views'));
// --- End Express Middleware Setup ---

// --- Routes Setup ---
// Import your post routes
const postRoutes = require('./routes/postRoutes');

// Use your post routes: All routes defined in postRoutes.js will be prefixed with /posts
app.use('/posts', postRoutes);

// Root route - redirect to /posts for the main blog page
app.get('/', (req, res) => {
    res.redirect('/posts');
});
// --- End Routes Setup ---


// --- Start Server ---
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});