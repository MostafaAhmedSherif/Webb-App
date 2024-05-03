import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect , useState } from 'react';
import RecipeCard from '../Components/RecipeCard';
const HomePage = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const buttonStyle = {
        fontSize: '1.2rem',
        padding: '15px 30px',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        marginBottom: '20px',
    };

    const primaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#FF6347',
        color: '#fff',
    };

    const secondaryButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#20B2AA',
        color: '#fff',
    };

    const [recipes , setRecipes] = useState([]);

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

    return (
        <div>
        <Container className="mt-5 text-center">
            <Row>
                <Col>
                    <h1 style={{ fontSize: '3rem', marginBottom: '40px' }}>Welcome to Recipes</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs={12} md={6}>
                    <Button style={primaryButtonStyle} onClick={() => navigate('/searchwithmaindish')}>
                        Search with Main Dish
                    </Button>
                </Col>
                <Col xs={12} md={6}>
                    <Button style={secondaryButtonStyle} onClick={() => navigate('/searchwithoptions')}>
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

export default HomePage;
