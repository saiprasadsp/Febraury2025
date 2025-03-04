import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();
  const handleClick=(e)=>{
    e.preventDefault();
    navigate('/')
  }
  return (
    <div>
    <Container className=' d-flex justify-content-center flex-column mb-3'>
      <Button onClick={handleClick}>Go to Login</Button>
      <h1 className='text-center'>Un-Authorized User</h1>
    </Container>

    </div>
  )
}
