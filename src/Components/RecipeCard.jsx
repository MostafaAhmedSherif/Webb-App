import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

const RecipeCard = ({ id, title, description, rating, ingredients, imageUrl }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log(id);
    const recipeId = id.startsWith('http://www.edamam.com/') ? id.replace('http://www.edamam.com/ontologies/edamam.owl#', '') : id;
    navigate(`/viewRecipe/${recipeId}`);
  };

  return (
    <Card className="mx-auto" style={{ cursor: 'pointer', width: '30%' 
    }} onClick={handleCardClick}>
      <Card.Body className="d-flex p-0">
        <Card.Img variant="left" src={imageUrl} alt="Recipe" style={{ width: '30%', height: 'auto' }} />
        <ListGroup variant="flush" className="w-100">
          <ListGroup.Item>
            <Card.Title>{title.charAt(0).toUpperCase() + title.slice(1)}</Card.Title>
          </ListGroup.Item>
          <ListGroup.Item>
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`rating-star ${i < rating ? 'text-warning' : 'text-secondary'}`}>
                ★
              </span>
            ))}
          </ListGroup.Item>
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default RecipeCard;
