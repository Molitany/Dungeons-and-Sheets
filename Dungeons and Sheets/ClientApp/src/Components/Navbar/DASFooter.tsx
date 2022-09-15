import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Twitter from "../../Socials/Logo blue.svg"
import Github from "../../Socials/GitHub_Logo_White.png"

function DASFooter() {
    return (
        <Navbar bg="dark" expand="lg" variant="dark" fixed="bottom">
            <Container>
                <Navbar.Brand style={{ opacity: '80%' }}>Copyright: Dungeons & Sheets 2022Ⓒ</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <a target="_blank" href="https://twitter.com/DungeonsSheets" style={{ marginRight: '1rem', marginLeft: '1rem' }}><img src={Twitter} width="32" height="32" alt="Twitter logo"></img></a>
                        <a target="_blank" href="https://github.com/Molitany/Dungeons-and-Sheets" style={{ marginRight: '1rem' }}><img src={Github} width="64" height="32" alt="Twitter logo"></img></a>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default DASFooter;