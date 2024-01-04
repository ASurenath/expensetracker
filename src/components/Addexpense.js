import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addFinanceApi, getCategsApi, getExpenseCategsApi } from '../apiservice/allApi';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';





function Addexpense({ setupdatefinances }) {
  // __________states__________
  const [show, setShow] = useState(false);
  const [categs, setcategs] = useState([])
  const [inputdata, setinputdata] = useState({
    id: "",
    type: "expense",
    title: "",
    amount: "",
    categoryId: 9,
    date: ""
  })

  //__________useEffects____________
  useEffect(() => { getcategories() }, [])

  //___________API calls___________
  const getcategories = async () => {
    const result = await getExpenseCategsApi()
    setcategs(result.data)
  }
  const addexpense = async () => {
    return await addFinanceApi({ ...inputdata, "date": Date.now() })
  }

  // __________Functions__________
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    cleardata()
  }
  const cleardata = () => {
    setinputdata({
      id: "",
      type: "expense",
      title: "",
      amount: "",
      categoryId: 9,
      date: ""
    })
  }
  const submitdata = async () => {
    if (!inputdata.title) {
      toast.warning('Please enter a title', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else if(+inputdata.amount<=0){
      toast.warning('Please enter a valid number', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      const result = await addexpense()
      // console.log(result);
      if (result.status >= 200 && result.status < 300) {
        toast.success('Expense added successfully!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });        
        
        handleClose()
        setupdatefinances(result)
      }
    }

  }
  const setdata = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setinputdata({ ...inputdata, [name]: value })
  }
  return (
    //______________Content________________
    <div>
      <button type="button" className='btn-exp fw-bold' onClick={handleShow}>Add Expense</button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className='pb-0 fw-light'>Add Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <InputGroup className="mb-3">
              <InputGroup.Text className='text-danger'> - &nbsp; <i className="fa-solid fa-indian-rupee-sign" /></InputGroup.Text>
              <FloatingLabel label="Amount">
                <Form.Control type="number" placeholder="0.00" name='amount' onChange={(e) => setdata(e)} className='fs-3' />
              </FloatingLabel>
              <FloatingLabel label="Title" style={{ width: '' }}>
                <Form.Control name='title' onChange={(e) => setdata(e)} type="text" placeholder="Title" style={{ textAlign: 'center' }} />
              </FloatingLabel>
            </InputGroup>
            <p className='p-0 m-0 ps-1'>
              Select Category:

            </p>            <div className='categgrid grid' >
              {categs?.length > 0 ? categs.map(i =>
                <div
                  className={(inputdata.categoryId == i.id) ? "selected" : ""}
                  onClick={() => { setinputdata({ ...inputdata, "categoryId": i.id }) }}>
                  <i className={"fa-solid " + i.icon}></i> {i.title}</div>
              ) : <div>Loading...</div>
              }
            </div>




          </Form>

        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button className="btn-flat btn btn-secondary" onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-flat btn-exp" onClick={submitdata}>
              Add
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addexpense