import React, { useEffect, useState } from 'react';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {

    const [token, setToken] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);
    }, [])

    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.removeItem('token');
            setToken("");
        }
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    {token ?
                        <>
                            <Nav.Link as={Link} to="/myrecipes">My Recipes</Nav.Link>
                            <Nav.Link onClick={logout}>Logout</Nav.Link>
                        </> : <>
                            <Nav.Link as={Link} to="/login">Login</Nav.Link>
                            <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                        </>
                    }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default NavbarComponent;
