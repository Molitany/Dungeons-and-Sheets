import React from 'react';
import axios from "axios"
import Button from "react-bootstrap/Button"
import useAuth from '../../AuthProvider/Auth';

function Landing() {
  const {logout} = useAuth()
  return (
    <div>
      THIS WORKSx
      <Button onClick={() => logout()}>Click me for logout</Button>
    </div>
  )
}

export default Landing;
