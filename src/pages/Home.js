import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Home() {
  return (
    <div className='page'>
      <Container fluid='sm'>
        <Row>
          <Col lg={6}>
            <img src="pie.gif" alt="" className='pieimage'/>
          </Col>
          <Col lg={6} className='d-flex justify-content-center align-items-center' >
            <Link to={'/dashboard'}>
              <button className='btn-exp p-4 mb-3'>
                <h1 className='fw-light'>Get Started Now!</h1>
              </button>
            </Link>
          </Col>
        </Row>
        <Row>
          <Col lg={4}>
          <Link to={'/dashboard'}>
              <button className='btn-inc p-4  mb-3'>
                <h3 className='fw-light'>Track Your Money!</h3>
              </button>
            </Link>
          </Col>
          <Col lg={4}>
          <Link to={'/categories'}>
              <button className='btn-inc p-4 mb-3'>
                <h3 className='fw-light'>Manage Categories!</h3>
              </button>
            </Link>
          </Col>
          <Col lg={4}>
          <Link to={'/charts'}>
              <button className='btn-inc p-4 mb-3'>
                <h3 className='fw-light'>Know How You Spend!</h3>
              </button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Home