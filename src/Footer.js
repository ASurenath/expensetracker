import React from 'react'
import { Container, Navbar } from 'react-bootstrap'


function Footer() {
  return (
    <Navbar  style={{backgroundColor:'cornsilk'}}>
      <Container fixed="bottom" className='w-75 d-flex justify-content-around p-1'>
        <img src='logo.png' height={25} className='logo' alt='Expense Tracker'/>     
        <i className='text-secondary' style={{fontSize:'smaller'}}>Created with JSON-Server </i>   
      </Container>
    </Navbar>
  )
}

export default Footer