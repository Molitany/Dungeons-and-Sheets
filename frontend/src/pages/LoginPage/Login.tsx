import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

import { useState, useEffect } from "react"
import useAuth from "../../Components/AuthProvider/Auth"

function Login() {
  const { login, signUp } = useAuth();
  const create = (e: any) => {
    signUp(email, name, password)
  }
  const submitLoginInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(email, password)
  }

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  return (
    <Card>
      <Form onSubmit={submitLoginInfo}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Name" onChange={e => setName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
        <Button variant="danger" onClick={create}>
          Create
        </Button>
      </Form>
    </Card>
  )
}

export default Login;
