import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import useAuth from '../../Components/AuthProvider/Auth';
import DASNavbar from '../../Components/Navbar/DASNavbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import DASFooter from '../../Components/Navbar/DASFooter';

function Landing() {
  const { logout } = useAuth()
  return (
    <>
      <DASNavbar />
      <DASFooter />
      <Container>
        <Card style={{marginTop: '1rem'}}>
          <Card.Body>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas in ex neque. Nullam eu porttitor enim. Nullam eget nulla enim. In vitae accumsan ipsum, vel tempus lorem. In rutrum ipsum massa. Curabitur elementum neque velit, in sollicitudin tellus maximus eu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Etiam vitae bibendum enim, ac convallis est. Aenean ultricies nibh vel ex dignissim dapibus. Ut eget elementum orci, tristique ullamcorper turpis. Nulla fringilla ultricies varius. Aliquam vehicula ante non libero dictum ultricies sed in eros. Etiam imperdiet nunc sit amet bibendum accumsan. Praesent rutrum ligula et odio egestas pulvinar. Phasellus id tempus est, in iaculis tellus. Fusce a est at mi ultrices finibus sit amet sit amet sapien. Duis laoreet tempus tortor nec bibendum. Sed vehicula vulputate lacus vitae volutpat. Morbi id magna malesuada, sagittis lorem vel, eleifend odio. Fusce ut consectetur ante, in vulputate ex.
          </Card.Body>
        </Card>
      </Container>
      
    </>
  )
}

export default Landing;
