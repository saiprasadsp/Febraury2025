import React from 'react'
import { Container,Row,Col } from "react-bootstrap";

export default function FormContainer({children}) {
  return (
    <Container fluid>
        <Row className='justify-content-md-center mt-5 '>
            <Col xs={12} md={6} className='card p-5 border border-warning'>
            {children}
            </Col>
        </Row>
    </Container>
  )
}
