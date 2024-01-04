import React, { useState } from 'react'
import { deleteFinanceApi } from '../apiservice/allApi'
import { toast } from 'react-toastify'


function Finance({f,setupdatefinances}) {
    //_____________States_____________
const [displayValue,setdisplayValue]=useState('hidden')
      //___________API calls___________
  const deletefinance = async () => {
    const result = await deleteFinanceApi(f.id)
    if (result.status >= 200 && result.status < 300) {
      toast.warning('Expense deleted!', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });        
        setupdatefinances(result)
        hidedeletedisplay()
    }
  }
  //______________other functions_______________
  const hidedeletedisplay=()=>{
    setdisplayValue('None')
  }
  const showdeletedisplay=()=>{
    setdisplayValue('Block')
  }

  return (
    <div style={{position:'relative'}}>
    <div className='financediv finacegrid'>
        <div className={f?.type=="income"?"inc":"exp"}>{f?.type=="income"?"+ ":"- "}{f.amount}</div>
        <div className=' text-secondary-emphasize'>{f?.title}</div>
        <div className='text-start text-secondary'> <i className={"fa-solid "+f?.category?.icon}></i> &nbsp;{f?.category?.title}</div>
        <div onClick={showdeletedisplay} style={{cursor:'pointer'}}><i className='fa-solid fa-trash'></i></div>
    </div>
    <div className='deletebox text-center' style={{display:`${displayValue}`}}>
           <p className='d-inline'> Sure to delete? </p>
            <button className='btn-flat bg-exp d-inlin-block p-1' onClick={deletefinance}> Yes </button> <button className='btn-flat bg-inc d-inline-block p-1' onClick={hidedeletedisplay}> No </button>
        </div>
    </div>
    
  )
}

export default Finance