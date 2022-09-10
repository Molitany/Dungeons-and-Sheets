import React, {useState} from 'react';
import { Col, Row, Button, Collapse } from 'react-bootstrap';


function CharacterStub(props) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <>
      <Row onClick={() => setExpanded(!expanded)}>
        <Col>{props.race}</Col>
        <Col>
          <Row>
            {props.classes.map((c,index) => {
              return (
                <Col key={`Stub ${index}`}> {c.name} ({c.level})</Col>
              )
            })}
          </Row>
        </Col>
      </Row>
      <Collapse in={expanded}>
        <Row>
          <Col>
            <hr/>
            <Button href={`/characters/builder/${props.index}`} className='mr-1'>Edit</Button>
            <Button className='mr-1'>View</Button>
          </Col>
        </Row>  
      </Collapse>
    </>
  );
}


export default CharacterStub