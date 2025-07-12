const mongoose = require('mongoose');

// Define the schema for a blog post
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Anonymous',
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Middleware to update the 'updatedAt' field before saving (pre-save hook)
postSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

// Create the Mongoose model from the schema
const post = mongoose.model('post', postSchema); // Model name passed to mongoose.model is 'Post'

// Export the Post model
module.exports = post; // Variable being exported is 'Post'
