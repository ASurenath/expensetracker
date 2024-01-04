import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addFinanceApi, getCategsApi, getIncomeCategsApi } from '../apiservice/allApi';
import { Form } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import InputGroup from 'react-bootstrap/InputGroup';
import { toast } from 'react-toastify';



function Addincome({ setupdatefinances }) {
  // __________states__________
  const [show, setShow] = useState(false);
  const [categs, setcategs] = useState([])
  const [inputdata, setinputdata] = useState({
    id: "",
    type: "income",
    title: "",
    amount: "",
    categoryId: 1,
    date: ""
  })

  //__________useEffects____________
  useEffect(() => { getcategories() }, [])

  //___________API calls___________
  const getcategories = async () => {
    const result = await getIncomeCategsApi()
    setcategs(result.data)
  }
  const addincome = async () => {
    return await addFinanceApi({ ...inputdata, "date": Date.now() })
  }

  // __________Functions__________
  const handleClose = () => {
    setShow(false);
    cleardata()
  }
  const handleShow = () => setShow(true);
  const cleardata = () => {
    setinputdata({
      id: "",
      type: "income",
      title: "",
      amount: "",
      categoryId: 1,
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
    else if (+inputdata.amount <= 0) {
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
      const result = await addincome()
      // console.log(result);
      if (result.status >= 200 && result.status < 300) {
        toast.success('Income added successfully!', {
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
      <button type="button" className='btn-inc fw-bold' onClick={handleShow}>Add Income</button>

      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        centered>
        <Modal.Header closeButton>
          <Modal.Title className='pb-0 fw-light'>Add Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <InputGroup className="mb-3">
              <InputGroup.Text className='text-success'> + &nbsp; <i className="fa-solid fa-indian-rupee-sign" /></InputGroup.Text>
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
                i.type == "income" && (<div
                  className={(inputdata.categoryId == i.id) ? "selected" : ""}
                  onClick={() => { setinputdata({ ...inputdata, "categoryId": i.id }) }}>
                  <i className={"fa-solid " + i.icon}></i> {i.title}</div>
                )) : <div>Loading...</div>
              }
            </div>

          </Form>

        </Modal.Body>
        <Modal.Footer>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button className='btn-flat btn btn-secondary' onClick={handleClose}>
              Cancel
            </button>
            <button className="btn-flat btn-inc" onClick={submitdata}>
              Add
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Addincome