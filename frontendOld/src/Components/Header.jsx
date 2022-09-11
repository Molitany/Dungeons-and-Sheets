import React, {useState} from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import Nav from 'react-bootstrap/Nav'


function Header() {
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }

    return (
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/">Dungeons & Sheets</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Character" id="basic-nav-dropdown" 
                        show={show}
                        onMouseEnter={showDropdown}
                        onMouseLeave={hideDropdown}>
                            <NavDropdown.Item href="/characters">Characters</NavDropdown.Item>
                            <NavDropdown.Item href="/characters/builder">Character Builder</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
export default Header;