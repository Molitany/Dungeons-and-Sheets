import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import CharacterStub from '../../Components/CharacterStub';

function CharacterList() {
  return (
    <Container>
      <Row>
        <Col className="fw-bold fs-3">
          Characters
        </Col>
        <Col>
          <Button className="float-right"> New </Button>
        </Col>
      </Row>
      <hr/>
      {CreateCharacterStubs()}
    </Container>
  );
}

function CreateCharacterStubs() {
  let [characters, _] = useState(localStorage.getItem('characters'));
  return JSON.parse(characters).map((c,index) => {
    return (
      <>
        <CharacterStub key={`List ${index}`} race={c.race} classes={c.classes} index={index}/>
        <hr/>
      </>
    )
  });
}

export default CharacterList