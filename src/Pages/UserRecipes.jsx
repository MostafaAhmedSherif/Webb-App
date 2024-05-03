import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const UserRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const headers = {
            Authorization: `${localStorage.getItem('token')}`
        };

        axios.post('http://localhost:4000/recipe/forUser' , {} , { headers })
        .then(res => {
            console.log(res);
            setRecipes(res.data);
            setIsLoading(false);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    return (
        <Container style={{
            padding:"5%"
        }}>
            <Row>
                <Col>
                    <h2 className="text-center">Your Recipes</h2>
                </Col>
                <Col className="text-center">
                    <Button onClick={() => navigate('/addRecipe')} style={{ backgroundColor: '#FF6347', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', transition: 'all 0.3s ease', marginBottom: '20px' }}>
                        Create New Recipe
                    </Button>
                </Col>
            </Row>
            <Row>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    recipes.map((recipe, index) => (
                        <React.Fragment key={index}>
                            <Col md={4}>
                                <div style={{ marginBottom: '20px' }}>
                                    {/* Recipe Card */}
                                    <div>
                                        <img src={recipe.images ? recipe.images.REGULAR.url : recipe.image} alt={recipe.label} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                        <h3>{recipe.label}</h3>
                                        <p>Rating: {recipe.rating ? recipe.rating : 0}</p>
                                        <Button variant="primary" onClick={() => handleEdit(recipe.uri ? recipe.uri : recipe._id)}>Edit</Button>
                                    </div>
                                </div>
                            </Col>
                        </React.Fragment>
                    ))
                )}
            </Row>
        </Container>
    );
}

export default UserRecipes;
