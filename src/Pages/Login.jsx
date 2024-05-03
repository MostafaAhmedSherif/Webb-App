// creata a Login page using bootstrap
import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useEffect , useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        const data = {
            email: email,
            password: password
        }

        axios.post('http://localhost:4000/users/login', data)
            .then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.token);
                navigate('/myrecipes');
                window.location.reload();
            })
            .catch(err => {
                console.log(err);
            })


    }

    return (
        <div className="container">
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}

export default Login;
