import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import './../Signin.css'
import { useState, useEffect } from "react"
import useAuth from "../../AuthProvider/Auth"

function Signup() {
  const { signUp } = useAuth();
  let navigate = useNavigate();

  const submitSignupInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signUp(email, name, password)
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <div className='center' style={{height: '100vh', background: "linear-gradient(0deg, rgba(27,41,34,1) 0%, rgba(73,111,93,1) 100%)"}}>
      <Card style={{width: '25rem', height: 'auto', padding: '1rem', margin: '1rem'}}>
        <Form onSubmit={submitSignupInfo}>
          <Form.Group className="mb-3 xd" controlId="formBasicEmail" style={{marginTop: '1em'}}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3 xd" controlId="formBasicPassword">
            <Form.Label >Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3 xd" controlId="formName">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" onChange={e => setName(e.target.value)} />
          </Form.Group>
          <div className='center'>
            <Button variant="primary" type="submit" className='xd'>
              Create Account
            </Button>
            <Button variant="success" onClick={() => navigate('/Login')} className='xd'>
              Already have an account?
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Signup;
