import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../Components/RecipeCard';

const SearchWithMainDish = () => {
    const [searchValue, setSearchValue] = useState('');
    const [recipes, setRecipes] = useState([]); 
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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

    const handleSearch = () => {
        setIsLoading(true);
        axios.post('http://localhost:4000/searchWithMainDish', {search: searchValue})
        .then(res => {
            console.log(res);
            setRecipes(res.data);
            setIsLoading(false);
        })
        
    };



    return (
        <div>
        <Container className="mt-5">
            <Row>
                <Col>
                    <h2 className="text-center">Search By Main Dish</h2>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Form.Control
                        type="text"
                        placeholder="Enter main dish"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </Col>
                <Col xs="auto" className="mt-3 mt-sm-0">
                    <Button variant="primary" onClick={handleSearch} block>
                        Search
                    </Button>
                </Col>
                <Col xs="auto" className="mt-3 mt-sm-0">
                    <Button variant="secondary" onClick={() => navigate('/searchwithoptions')} block>
                        Search with Ingredients
                    </Button>
                </Col>
            </Row>
        </Container>
        
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

export default SearchWithMainDish;
