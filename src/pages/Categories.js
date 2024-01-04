import React, { useEffect, useState } from 'react'
import { addCategApi, deleteCategApi, getCategsApi } from '../apiservice/allApi'
import { FloatingLabel, Form, InputGroup, Modal } from 'react-bootstrap';
import { icons } from '../icons';
import { toast } from 'react-toastify';




function Categories() {
    // _________States______________
    const [categs, setcategs] = useState([])
    const [show1, setShow1] = useState(false);
    // const [show2, setShow2] = useState(false);
    const [inputdata, setinputdata] = useState({ Id: "", title: "", icon: "fa-icons", type: "expense" });
    const [categid, setcategid] = useState('')
    const [updateCateg, setupdateCateg] = useState('')

    //__________useEffects____________
    useEffect(() => { getcategories() }, [updateCateg])
    //___________API calls___________
    const getcategories = async () => {
        const result = await getCategsApi()
        if (result.status >= 200 && result.status < 300) {
            
            setcategs(result.data)
        }
        else {
            await getcategories()               //remove before hosting
        }
    }
    const deleteCateg = async (id) => {
        if (id < 10) {
            toast.warning('Default categories can not be deleted!', {
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
            const result = await deleteCategApi(id)
            if (result.status >= 200 && result.status < 300) {
                setupdateCateg(result)
                toast.warning('Category deleted!', {
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
        }
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
        else {
            const result = await addCategApi(inputdata)
            if (result.status >= 200 && result.status < 300) {
                toast.success('Category added successfully', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setupdateCateg(result)
                handleClose1()
            }
        }

    }
    //____________modal functions_______________
    const handleClose1 = () => {
        setShow1(false);
        cleardata()
    }
    const handleShow1 = () => setShow1(true);
    // const handleClose2 = () => setShow2(false);
    // const handleShow2 = () => setShow2(true);
    ///___________other functions______________
    const setdata = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setinputdata({ ...inputdata, [name]: value })
    }

    const cleardata = () => {
        setinputdata({ Id: "", title: "", icon: "fa-icons", type: "expense" })
    }


    const settype = (type) => {
        setinputdata({ ...inputdata, type })
    }
    const seticon = (icon) => {
        setinputdata({ ...inputdata, icon })
    }
    const getid = (e, id) => {
        e.preventDefault()
        setcategid(id)
        console.log(id)
    }
    const draggingover = (e) => {
        e.preventDefault()
    }
    const dropping = async (e) => {
        console.log("dropped", categid)
        if (categid) {
            await deleteCateg(categid)
        }
        setcategid('')
    }
    return (
        <>
            <div className='page'>
                <div className='financecontainer'>
                    <h2 className='fw-light p-0 m-0'>Categories</h2>
                    <hr />
                    <h4 className='fw-light p-0 m-0'>Expenses</h4>
                    <div className='categgrid grid'>
                        {categs?.filter(j => j.type == 'expense').length > 0 ? categs?.filter(j => j.type == 'expense').map(i =>
                            <div
                                draggable
                                onDrag={(e) => { getid(e, i.id) }}
                                className=''>
                                <i className={"fa-solid " + i.icon}></i> {i.title}</div>
                        ) : <div onClick={getcategories}>Loading...</div>
                        }
                    </div>
                    <h4 className='fw-light p-0 m-0'>Incomes</h4>
                    <div className='categgrid grid'>
                        {categs?.filter(j => j.type == 'income').length > 0 ? categs?.filter(j => j.type == 'income').map(i =>
                            <div
                                draggable onDrag={(e) => { getid(e, i.id) }}
                                className=''>
                                <i className={"fa-solid " + i.icon}></i> {i.title}</div>
                        ) : <div onClick={getcategories}>Loading...</div>
                        }
                    </div>
                    <button type="button" className='btn-exp fw-bold fs-1 py-1 my-3 mx-5' onDragOver={e => draggingover(e)} onDrop={e => dropping(e)}><i className='fa-solid fa-trash' /></button>
                    <button type="button" className='btn-inc fw-bold fs-1 py-1 my-3 mx-5' onClick={handleShow1}><i className='fa-solid fa-plus' /></button>
                </div>




                <Modal
                    show={show1}
                    onHide={handleClose1}
                    size="sm"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title className='pb-0 fw-light'>Add Category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form >
                            <div className='d-flex justify-content-center mb-2'>
                                <div className='typegrid grid '>
                                    <div onClick={() => settype('expense')} className={inputdata.type == 'expense' ? 'selected' : ''}>Expense</div>
                                    <div onClick={() => settype('income')} className={inputdata.type == 'income' ? 'selected' : ''}>Income</div>
                                </div>
                            </div>

                            <FloatingLabel label="Title" style={{ width: '' }}>
                                <Form.Control name='title' onChange={(e) => setdata(e)} type="text" placeholder="Title" style={{ textAlign: 'center' }} />
                            </FloatingLabel>
                            Select icon:
                            <div className='icongrid grid '>
                                {icons?.map(i =>
                                    <div onClick={() => seticon(i)} className={inputdata.icon == i ? 'selected' : ''}><i className={'fa-solid ' + i} /></div>
                                )}                </div>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                            <button className="btn-flat btn btn-secondary" onClick={handleClose1}>
                                Cancel
                            </button>
                            <button className="btn-flat btn-inc" onClick={submitdata}>
                                Add
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    )
}

export default Categories