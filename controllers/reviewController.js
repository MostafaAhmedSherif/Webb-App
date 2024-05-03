const { Types } = require('mongoose');

const Review = require('../models/review');

const getReviews = async (req, res) => {    
    try {
        const reviews = await Review.find();
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createReview = async (req, res) => {
    const review = req.body.submitReview;
    review.userId = req.user.id;
    console.log(review);
    const newReview = new Review(review);
    try {
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteReview = async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(404).send('No review with that id');
    try {
        await Review.findByIdAndDelete(id);
        res.json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getReviewsByRecipeId = async (req, res) => {
    const { recipeId } = req.body;
    try {
        const reviews = await Review.find({ recipeId });
        if (reviews.length === 0) return res.status(200).json([]);
        res.status(200).json(reviews);
    } catch (error) {
        res.status(200).json([]);
    }
}


const getRatingByRecipeId = async (recipeId) => {
    try {
        const reviews = await Review.find({ recipeId });
        if (reviews.length === 0) return 0;
        const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
        return totalRating / reviews.length;
    } catch (error) {
        return 0;
    }
};

module.exports = { getReviews, createReview, deleteReview, getReviewsByRecipeId, getRatingByRecipeId };