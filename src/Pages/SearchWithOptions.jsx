import React, { useEffect, useState } from 'react';
import { Form, Button, Row, Col, Badge , Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeCard from '../Components/RecipeCard';
const SearchWithOptions = () => {
    const navigate = useNavigate();
    const [ingredientSearchQuery, setIngredientSearchQuery] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [filteredIngredients, setFilteredIngredients] = useState([]);
    const [availableIngredients, setAvailableIngredients] = useState([]);
    const [dietaryPreferences, setDietaryPreferences] = useState([]);
    const [filteredDietaryPreferences, setFilteredDietaryPreferences] = useState([]);
    const [dietaryPreferencesChoices, setDietaryPreferencesChoices] = useState([
        'alcohol-cocktail', 'alcohol-free', 'celery-free', 'crustacean-free', 'dairy-free', 'DASH', 'egg-free',
        'fish-free', 'fodmap-free', 'gluten-free', 'immuno-supportive', 'keto-friendly', 'kidney-friendly', 'kosher',
        'low-fat-abs', 'low-potassium', 'low-sugar', 'lupine-free', 'Mediterranean', 'mollusk-free', 'mustard-free',
        'no-oil-added', 'paleo', 'peanut-free', 'pescatarian', 'pork-free', 'red-meat-free', 'sesame-free',
        'shellfish-free', 'soy-free', 'sugar-conscious', 'sulfite-free', 'tree-nut-free', 'vegan', 'vegetarian', 'wheat-free'
    ]);
    const [dietarySearchQuery, setDietarySearchQuery] = useState('');
    const [recipes, setRecipes] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.post('http://localhost:4000/getRandomRecipes')
        .then(res => {
            console.log(res);
            setRecipes(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        // Fetch ingredients on component mount
        const fetchIngredients = async () => {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
                const data = await response.json();
                const ingredients = data.meals.map(ingredient => ingredient.strIngredient);
                setAvailableIngredients(ingredients);
            } catch (error) {
                console.error('Error fetching ingredients:', error);
            }
        };
        fetchIngredients();
    }, []);

    const handleIngredientChange = (e) => {
        const query = e.target.value;
        setIngredientSearchQuery(query);
        const filtered = availableIngredients.filter(ingredient => ingredient.toLowerCase().includes(query.toLowerCase()));
        setFilteredIngredients(filtered);
    };

    const handleIngredientSelect = (ingredient) => {
        if (selectedIngredients.includes(ingredient)) {
            return;
        }
        setSelectedIngredients([...selectedIngredients, ingredient]);
        setIngredientSearchQuery('');
    };

    const handleRemoveIngredient = (ingredient) => {
        const updatedIngredients = selectedIngredients.filter(item => item !== ingredient);
        setSelectedIngredients(updatedIngredients);
    };

    const handleDietaryPreferenceSelect = (preference) => {

        setDietaryPreferences([...dietaryPreferences, preference]);
        setDietarySearchQuery('');
    };

    const handleRemoveDietaryPreference = (preference) => {
        const updatedPreferences = dietaryPreferences.filter(item => item !== preference);
        setDietaryPreferences(updatedPreferences);
    };

    useEffect(() => {
        const filteredPrefs = dietaryPreferencesChoices.filter(preference =>
            preference.toLowerCase().includes(dietarySearchQuery.toLowerCase())
        );
        setFilteredDietaryPreferences(filteredPrefs);
    }, [dietarySearchQuery]);

    const handleDietaryPreferenceChange = (e) => {
        setDietarySearchQuery(e.target.value);
    };

    const handleSearch = () => {
        setIsLoading(true);
        console.log('Selected Ingredients:', selectedIngredients);
        console.log('Selected Dietary Preferences:', dietaryPreferences);

        // Add logic for search
        axios.post('http://localhost:4000/searchWithIngredients', {
            ingredients: selectedIngredients,
            dieterylabels: dietaryPreferences
        })
        .then(res => {
            console.log(res);
            setRecipes(res.data);
            setIsLoading(false);
        })
    };

    return (
        <div className="container" style={{
            paddingTop: '15px',
        }}>
            <div style={{
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                width: '100%',
            }}>
            <Row className="mb-4">
                <Col md={6}>
                    <h2 className="text-xl font-semibold mb-3">Select Ingredients</h2>
                    <Form.Control
                        type="text"
                        placeholder="Search ingredients..."
                        value={ingredientSearchQuery}
                        onChange={handleIngredientChange}
                        className="mb-3"
                    />
                    {ingredientSearchQuery && (
                        <ul className="list-unstyled">
                            {filteredIngredients.slice(0, 6).map((ingredient, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleIngredientSelect(ingredient)}
                                    className="cursor-pointer mb-2"
                                >
                                    {ingredient}
                                </li>
                            ))}
                        </ul>
                    )}
                    {selectedIngredients.length > 0 && (
                        <div>
                            <div className="mb-3">
                                {selectedIngredients.map((ingredient, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleRemoveIngredient(ingredient)}
                                        variant="outline-secondary"
                                        className="mr-2 mb-2"
                                    >
                                        {ingredient}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </Col>
                <Col md={6}>
                    <h2 className="text-xl font-semibold mb-3">Dietary Preferences</h2>
                    <Form.Control
                        type="text"
                        placeholder="Search dietary preferences..."
                        value={dietarySearchQuery}
                        onChange={handleDietaryPreferenceChange}
                        className="mb-3"
                    />
                    {dietarySearchQuery && (
                        <ul className="list-unstyled">
                            {filteredDietaryPreferences.slice(0, 6).map((preference, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleDietaryPreferenceSelect(preference)}
                                    className="cursor-pointer mb-2"
                                >
                                    {preference}
                                </li>
                            ))}
                        </ul>
                    )}
                    {dietaryPreferences.length > 0 && (
                        <div>
                            <div className="mb-3">
                                {dietaryPreferences.map((preference, index) => (
                                    <Badge
                                        key={index}
                                        variant="primary"
                                        pill
                                        className="mr-2 mb-2 cursor-pointer"
                                        onClick={() => handleRemoveDietaryPreference(preference)}
                                    >
                                        {preference}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                </Col>
            </Row>

            <Col md={6} className="d-flex justify-content-center align-items-center">
                <div style={{
                    paddingRight: '50%',
                }}> 
                <Button
                    onClick={() => navigate('/searchwithmaindish')}
                    className="mr-2"
                    variant="secondary"
                    style={{ width: '200px'}}
                >
                    Search with Main Dish
                </Button>
                </div>
                <Button
                    onClick={handleSearch}
                    className="ml-2"
                    variant="primary"
                    style={{ width: '200px' }}
                >
                    Search
                </Button>
            </Col>
            </div>
                    
        <Container className="mt-5">

<Row className="mt-3">
    {isLoading ? 
    <div className="text-center">
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div> : 
    recipes.map((recipe, index) => {
         
        return(
        <RecipeCard
            key={index}
            id={recipe.uri? recipe.uri : recipe._id}
            title={recipe.label}
            rating={recipe.rating ? recipe.rating : 0}
            imageUrl={recipe.images? recipe.images.REGULAR.url : recipe.image}
        />
        );}
    )
    

}
</Row>
</Container>
            
        </div>
    );
};

export default SearchWithOptions;
