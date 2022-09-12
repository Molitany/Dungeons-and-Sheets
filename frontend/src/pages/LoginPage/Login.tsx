import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";
import './Login.css'
import { useState, useEffect } from "react"
import useAuth from "../../AuthProvider/Auth"

function Login() {
  const { login } = useAuth();
  let navigate = useNavigate();

  const submitLoginInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(email, password)
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <div className='center' style={{height: '100vh', backgroundColor: '#202124'}}>
      <Card style={{width: '25rem', height: '22rem'}}>
        <Form onSubmit={submitLoginInfo}>
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
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
          </Form.Group>
          <div className='center'>
            <Button variant="primary" type="submit" className='xd'>
              Login
            </Button>
            <Button variant="success" onClick={() => navigate('/SignUp')} className='xd'>
              Don't have an account?
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  )
}

export default Login;
