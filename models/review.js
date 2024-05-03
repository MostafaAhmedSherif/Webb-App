// create a review model that basically each review has a user id, recipe id, rating, and comment.

const mongoose = require('mongoose');
const { use } = require('passport');

const reviewSchema = new mongoose.Schema({
    userId: {
    type: String,
    required: true
    },
    recipeId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
    });

    
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;