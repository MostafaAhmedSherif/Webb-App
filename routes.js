const router = require('express').Router();
const userController = require('./controllers/userController');
const recipeController = require('./controllers/recipeController');
const reviewController = require('./controllers/reviewController');

const authenticateJWT = require('./middleware/authmiddleware');
/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with username and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Bad request if input is invalid
 */
router.post('/users', userController.createUser);

/**
 * @openapi
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Retrieve a list of all recipes.
 *     responses:
 *       200:
 *         description: A list of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 */
router.get('/recipes', recipeController.getRecipes);

// Include other routes here

module.exports = router;

router.post('/users', userController.createUser);
router.post('/users/login', userController.userLogIn);

router.get('/recipes', recipeController.getRecipes);
router.post('/recipes/:id', recipeController.getRecipe);

router.post('/recipes', authenticateJWT, recipeController.createRecipe);
router.patch('/recipes/update', authenticateJWT, recipeController.updateRecipe);
router.delete('/recipes/:id', authenticateJWT, recipeController.deleteRecipe);
router.post('/searchWithMainDish', recipeController.searchWithMainDish);
router.post('/searchWithIngredients', recipeController.searchWithIngredients);
router.post('/getRandomRecipes', recipeController.getRandomRecipes);
router.post('/recipe/byUri', recipeController.getRecipeByUri);
router.post('/recipe/forUser', authenticateJWT ,recipeController.getRecipesforuser);
router.post('/recipe/byid' ,recipeController.getRecipeById);

router.get('/reviews', reviewController.getReviews);
router.post('/reviews', authenticateJWT, reviewController.createReview);
router.delete('/reviews/:id', authenticateJWT, reviewController.deleteReview);
router.post('/reviewsbyrecipe', reviewController.getReviewsByRecipeId);


module.exports = router;