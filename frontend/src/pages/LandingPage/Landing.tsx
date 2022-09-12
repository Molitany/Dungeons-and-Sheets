import React, { useState } from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import useAuth from '../../AuthProvider/Auth';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';






function Landing() {
  const { logout } = useAuth()

  const [template, setTemplate] = useState('DND');

  function HandelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(template)
    let navigate = useNavigate()
    navigate("/CharacterBuilder")

  }

  return (
    <div>
      THIS WORKSx

      <Form onSubmit={HandelSubmit}>
        <Row>
          <Col lg="3">
            <InputGroup>
              <Form.Select onChange={(e) => setTemplate(e.target.value)}>
                <option disabled hidden value="">Choose you template</option>
                <option value="DND">D&d 5e</option>
                <option value="FATE">Fate</option>
              </Form.Select>
              <Button variant="primary" type="submit"> New Charactar </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>

      <Button onClick={() => logout()}>Click me for logout</Button>
    </div>
  )
}

export default Landing;
