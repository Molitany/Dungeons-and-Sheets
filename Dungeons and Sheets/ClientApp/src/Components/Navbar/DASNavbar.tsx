import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import  Button from 'react-bootstrap/Button';
import useAuth from '../AuthProvider/Auth'
import { useNavigate } from 'react-router-dom';

function DASNavbar() {
    let navigate = useNavigate()
    const { logout } = useAuth()
    const logOut = () => {
        logout()
        navigate('/Login')
    }
    return (
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="#home">Dungeons & Sheets</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Character List</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav>
                            <Button variant="danger" onClick={() => logOut()}>Logout</Button>
                        </Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DASNavbar;