import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Alert, Modal, Form, Button } from 'react-bootstrap';

const ViewRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);
  const [review, setReview] = useState({ rating: 0, message: '' });
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const StarRating = ({ rating, onRate }) => {
    const stars = Array.from({ length: 5 }, (_, index) => (
      <span key={index} onClick={() => onRate(index + 1)}>
        {index < rating ? "★" : "☆"}
      </span>
    ));
  
    return <div>{stars}</div>;
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.post('http://localhost:4000/reviewsbyrecipe', { recipeId: id });
      setReviews(response.data);
      setIsLoadingReviews(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url;
        let idNew;

        if (id.startsWith('recipe')) {
          url = 'http://localhost:4000/recipe/byUri';
          idNew = "http://www.edamam.com/ontologies/edamam.owl#" + id;
        } else {
          url = 'http://localhost:4000/recipes/byId';
          idNew = id;
        }

        const response = await axios.post(url, { id: idNew });
        setRecipe(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching recipe:', error);
        setError('Error fetching recipe. Please try again later.');
        setIsLoading(false);
      }
    };



    fetchData();
    fetchReviews();
  }, [id]);

  const handleAddReview = async () => {
    const headers = {
      Authorization: localStorage.getItem('token')
    };
    const submitReview = { 
      title: recipe.label,
      recipeId : id,
      rating: review.rating,
      comment: review.message
    };
      try {
      // Assuming you have an API endpoint to add reviews
      await axios.post('http://localhost:4000/reviews', { submitReview } , { headers });
      setIsReviewModalOpen(false);

    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    isLoading ? (
      <Container className="mt-5 text-center">
        <Row>
          <Col>
            <h1>Loading...</h1>
          </Col>
        </Row>
      </Container>
    ) : (
      <div>
        <Container fluid className="mt-4 w-full" style={{ width: '100%' }}>
      <Row className="justify-content-center">
        <Col md={8}>
          {error ? (
            <Alert variant="danger">{error}</Alert>
          ) : (
            <Card>
              <Row className="no-gutters">
                <Col md={6}>
                  <Card.Img src={recipe.image} alt={recipe.label} style={{ height: '100%', objectFit: 'cover' }} />
                </Col>
                <Col md={6}>
                  <Card.Body>
                    <h3 className="card-title">{recipe.label}</h3>
                    <p className="text-muted">Source: {recipe.source}</p>
                    <p className="text-muted">Total Time: {recipe.totalTime} minutes</p>
                    <p className="mb-3">Ingredients:</p>
                    <ul>
                      {recipe.ingredientLines.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                    <p className="mt-3 mb-3">Health Benefits:</p>
                    <div className="d-flex flex-wrap">
                      {recipe.healthLabels
                      .map((label, index) => {
                      return (
                        <div key={index} className="badge bg-primary rounded-pill m-1">
                            {label}
                        </div>
                      )})}
                    </div>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          )}
        </Col>
      </Row>
      </Container>

        <Container className="mt-5">
          <Row>
            <Col>
              <h2>Reviews</h2>
            </Col>
            <Col className="text-end">
              <button className="btn btn-primary" onClick={() => setIsReviewModalOpen(true)}>Add Review</button>
            </Col>
          </Row>
          <Row>
            {isLoadingReviews ? (
                <Col>
                    <p>Loading reviews...</p>
                </Col>
            ) : 
            reviews.length === 0 ? (
                <Col>
                    <p>No reviews found.</p>
                </Col>
            ) :
            reviews.map((review, index) => (
                <Col key={index} md={4}>
                    <Card>
                        <Card.Body>
                            <Card.Title>{review.comment}</Card.Title>
                            <Card.Text>
                                <StarRating rating={review.rating} />
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
         </Row>
        </Container>

        <Modal show={isReviewModalOpen} onHide={() => setIsReviewModalOpen(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Rating</Form.Label>
                <br />
                <StarRating rating={review.rating} onRate={(rating) => setReview({ ...review, rating })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={review.message}
                  onChange={(event) => {
                    setReview({ ...review, message: event.target.value });
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setIsReviewModalOpen(false)}>Close</Button>
            <Button variant="primary" onClick={handleAddReview}>Add Review</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  );
};

export default ViewRecipe;