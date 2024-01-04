import React, { useState } from 'react'
import Addexpense from '../components/Addexpense'
import Addincome from '../components/Addincome'
import { Col, Row } from 'react-bootstrap'
import Finances from '../components/Finances'


function Dashboard() {
//______________States_________________
const [updatefinances, setupdatefinances] = useState('')

  return (
    <div className='page'>
      <div className='financecontainer'>
          <Row>
            <Col>
            <Addexpense setupdatefinances={setupdatefinances}/>
            </Col>
            <Col>
            <Addincome setupdatefinances={setupdatefinances}/>
            </Col>
          </Row>
          <Finances updatefinances={updatefinances} setupdatefinances={setupdatefinances}/>
      </div>
    </div>
  )
}

export default Dashboard