import React from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <Navbar expand="lg" sticky="top" className="w-100" style={{ backgroundColor: 'cornsilk', zIndex: '1' }}>
      <Container fluid="sm">
        <Link to={'/'}>
          <Navbar.Brand><img src='logo.png' height={50} className='logo' alt='Expense Tracker' /></Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to={'/'}><h5 className='tab'>Home</h5></Link>
            <Link to={'/dashboard'} className='tab'><h5>Dashboard</h5></Link>
            <Link to={'/charts'} className='tab'><h5>Charts</h5></Link>
            <Link to={'/categories'} className='tab'><h5>Categories</h5></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header