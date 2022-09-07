import React, { useState } from 'react';
import {Container, Button} from 'react-bootstrap'

function App() {
  // Declare a new state variable, which we'll call "count"  
  const [count, setCount] = useState(0);
  
  return (
    <Container>
      <p>You clicked {count} times</p>
      <Button variant="primary" onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </Container>
  );
}
export default App