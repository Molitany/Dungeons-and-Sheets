import React, {useState} from 'react';
import { Container, Dropdown, ListGroup, ListGroupItem } from 'react-bootstrap';
import DropdownItem from 'react-bootstrap/esm/DropdownItem';

function CharacterBuilder() {
    let [characters, _] = useState(JSON.parse(localStorage.getItem('characters'))[parseInt(document.location.pathname.match(".+/([0-9]+)$")[1])]);

    return (
        <Container>
            Race
            <ListGroup>
                <ListGroupItem action> Bonk </ListGroupItem>
                <ListGroupItem action> Spronk </ListGroupItem>
                <ListGroupItem action> Blonk </ListGroupItem>
                <ListGroupItem action> Ponk </ListGroupItem>
            </ListGroup>
        </Container>
    );
}
export default CharacterBuilder