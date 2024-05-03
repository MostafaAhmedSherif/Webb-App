

import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [totalTime, setTotalTime] = useState(0);
    const [healthLabels, setHealthLabels] = useState('');
    const [ingredientLines, setIngredientLines] = useState('');
    const [calories, setCalories] = useState(0);
    const [fat, setFat] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [protein, setProtein] = useState(0);
    const navigate = useNavigate();

    const handleSubmit = () => {
        const headers = {
            Authorization: `${localStorage.getItem('token')}`
        };
        const recipe = {
            name,
            image,
            totalTime,
            healthLabels: healthLabels.split(','),
            ingredientLines: ingredientLines.split(','),
            calories,
            totalNutrients: {
                FAT: {
                    label: 'Fat',
                    quantity: fat,
                    unit: 'g'
                },
                CHOCDF: {
                    label: 'Carbs',
                    quantity: carbs,
                    unit: 'g'
                },
                PROCNT: {
                    label: 'Protein',
                    quantity: protein,
                    unit: 'g'
                }
            }
        };

        axios.post('http://localhost:4000/recipes', recipe, { headers })
            .then(res => {
                console.log(res);
                navigate('/myrecipes');
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <Container>
            <Row>
                <Col>
                    <h2 className="text-center">Create Recipe</h2>
                </Col>
            </Row>
            <Row>
                <Col xs={12} md={6}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter image URL"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Total Time</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter total time"
                                value={totalTime}
                                onChange={(e) => setTotalTime(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Health Labels</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter health labels separated by commas"
                                value={healthLabels}
                                onChange={(e) => setHealthLabels(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Ingredient Lines</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter ingredient lines separated by commas"
                                value={ingredientLines}
                                onChange={(e) => setIngredientLines(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Calories</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter calories"
                                value={calories}
                                onChange={(e) => setCalories(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Fat</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter fat"
                                value={fat}
                                onChange={(e) => setFat(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Carbs</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter carbs"
                                value={carbs}
                                onChange={(e) => setCarbs(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Protein</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter protein"
                                value={protein}
                                onChange={(e) => setProtein(e.target.value)}
                            />
                        </Form.Group>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default CreateRecipe;