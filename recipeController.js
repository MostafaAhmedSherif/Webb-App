const Recipe = require('../models/recipe');
const User = require('../models/users');
const axios = require('axios');
const reviewController = require('./reviewController');

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find();
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.body.id);
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createRecipe = async (req, res) => {
    const recipe = new Recipe(req.body);

    try {
        const user = await User.findById(req.user.id);
        console.log(req.body.name);
        recipe.label = req.body.name;

        recipe.userId = req.user.id;
        recipe.source = user.name;
        const newRecipe = await recipe.save();
        res.status(201).json(newRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateRecipe = async (req, res) => {
    try {
        console.log(req.body.id);
        const recipe = await Recipe.findById(req.body.id);
        recipe.label = req.body.label;
        recipe.image = req.body.image;
        recipe.totalTime = req.body.totalTime;
        recipe.healthLabels = req.body.healthLabels;
        recipe.ingredientLines = req.body.ingredientLines;
        recipe.calories = req.body.calories;
        
        const updatedRecipe = await recipe.save();
        res.json(updatedRecipe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        await recipe.remove();
        res.json({ message: 'Recipe deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



const searchWithMainDish = async (req, res) => {
    console.log('searchWithMainDish');
    const {search} = req.body;

    
    try {
        const appId = '05ce2c7e';
        const appKey = '2b9f5e2397adf38c339f39d644bc0e98';

        const url = 'https://api.edamam.com/api/recipes/v2';

        var response  = await axios.get(url, {
                params: {
                    type: 'public',
                    q: search,
                    app_id: appId,
                    app_key: appKey
                }
            });
        

        const recipes = response.data.hits.map(hit => hit.recipe);
        const recipesFromDB = await Recipe.find();

        recipesFromDB.forEach(recipe => {
                if (recipe.label.includes(search)) {
                    recipes.push(recipe);
                }
            }
        );

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeId = recipe.uri.split('#')[1];
            const rating = await reviewController.getRatingByRecipeId(recipeId);
            recipe.rating = rating;
        }

        res.status(200).json(recipes);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while trying to fetch recipes');
    }
};


function containsIngredient(ingredientLine, ingredient) {
    return ingredientLine.indexOf(ingredient) !== -1;
}

function containsHealthLabel(healthLabel, dieterylabel) {
    return healthLabel.indexOf(dieterylabel) !== -1;
}
const searchWithIngredients = async (req, res) => {
    const { ingredients , dieterylabels } = req.body;

    try {
        const appId = '05ce2c7e';
        const appKey = '2b9f5e2397adf38c339f39d644bc0e98';

        const url = 'https://api.edamam.com/api/recipes/v2';

        if(ingredients.length === 0 && dieterylabels.length === 0) {
            return res.status(400).json({ message: 'Please provide ingredients or dietery labels' });
        }
        if(ingredients.length === 0) {
            var response = await axios.get(url, {
                params: {
                    type: 'public',
                    health: dieterylabels.join(','), 
                    app_id: appId,
                    app_key: appKey
                }
            });
        }

        if(dieterylabels.length === 0) {
            var response = await axios.get(url, {
                params: {
                    type: 'public',
                    q: ingredients.join(','), 
                    app_id: appId,
                    app_key: appKey
                }
            });
        }
        if(ingredients.length !== 0 && dieterylabels.length !== 0) {
            var response = await axios.get(url, {
                params: {
                    type: 'public',
                    q: ingredients.join(','),
                    health: dieterylabels.join(','), 
                    app_id: appId,
                    app_key: appKey
                }
            });
        }

        

        const recipes = response.data.hits.map(hit => hit.recipe);

        const recipesFromDB = await Recipe.find();

        recipesFromDB.forEach(recipe => {
            
            ingredients.forEach(ingredient => {
                recipe.ingredientLines.forEach(ingredientLine => {
                    if (containsIngredient(ingredientLine.toLowerCase(), ingredient.toLowerCase())) {
                        recipes.push(recipe);
                    }
                });
            });
            dieterylabels.forEach(dieterylabel => {
                    recipe.healthLabels.forEach(healthLabel => {
                        if (containsHealthLabel(healthLabel.toLowerCase(), dieterylabel.toLowerCase())) {
                            recipes.push(recipe);
                        }
                    });
                }
                );
            }
        );
        res.status(200).json(recipes);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while trying to fetch recipes');
    }
};

const getRecipeByUri = async (req,res) => {
    try {
            const { id } = req.body;
            const appId = '05ce2c7e';
            const appKey = '2b9f5e2397adf38c339f39d644bc0e98';
            const url = 'https://api.edamam.com/api/recipes/v2/by-uri';
            const response = await axios.get(url, {
                params: {
                    type: 'public',
                    uri: id,
                    app_id: appId,
                    app_key: appKey
                }
            });
            if (response.status === 200 && response.data.hits.length > 0) {
                const recipe = response.data.hits[0].recipe;
                return res.status(200).json(recipe);     
        }


    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getRecipeById = async (req,res) => {
    try {
            const  id  = req.body.id;
            const recipe = await Recipe.findById(id);
            console.log(id);
            res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

const getRandomRecipes = async (req, res) => {
    console.log('getRandomRecipes');
    try {
        const appId = '05ce2c7e';
        const appKey = '2b9f5e2397adf38c339f39d644bc0e98';

        const url = 'https://api.edamam.com/api/recipes/v2';
        const RandomrecipesArray = ["Chicken" , "Beef" , "Fish" ];
        const randomIndex = Math.floor(Math.random() * RandomrecipesArray.length);
        var response  = await axios.get(url, {
                params: {
                    type: 'public',
                    q: RandomrecipesArray[randomIndex],
                    app_id: appId,
                    app_key: appKey
                }
            });
        

        const recipes = response.data.hits.map(hit => hit.recipe);

        for (let i = 0; i < recipes.length; i++) {
            const recipe = recipes[i];
            const recipeId = recipe.uri.split('#')[1];
            const rating = await reviewController.getRatingByRecipeId(recipeId);
            recipe.rating = rating;
        }

        res.status(200).json(recipes);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while trying to fetch recipes');
    }
}

const getRecipesforuser = async (req, res) => {
    try {
        const recipes = await Recipe.find({userId: req.user.id});
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





module.exports = {
    getRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    searchWithMainDish,
    searchWithIngredients,
    getRandomRecipes,
    getRecipeByUri,
    getRecipesforuser,
    getRecipeById
}