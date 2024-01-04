import React, { useEffect, useState } from 'react'
import { getCategoriesEmbedApi, getFinancesApi } from '../apiservice/allApi'
import Pie from '../components/Pie'
import { Tab, Tabs } from 'react-bootstrap'
import Line from '../components/Line'




function Charts() {
    //____________States_______________
    const [categories, setcategories] = useState([])
    const [finances, setfinances] = useState([])
    const [loaded, setloaded] = useState(false)

    //___________API calls___________
    const getcategories = async () => {
        const result = await getCategoriesEmbedApi()
        setcategories(result.data)
        setloaded(true)
    }
    const getfinances = async () => {
      const result = await getFinancesApi()
      setfinances(result.data)
      setloaded(true)
  }

    //___________UseEffects___________
    useEffect(() => { getcategories() }, [])
    useEffect(() => { getfinances() }, [])
  return (
    <div className='page'>
      <div className='financecontainer'>
        <Tabs
        defaultActiveKey="expenses"
        id="fill-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="expenses" title="Expenses" className='text-dark'>
              <div><Pie categories={categories?.filter(i=>i.type=='expense')}></Pie></div>
        </Tab>
        <Tab eventKey="incomes" title="Incomes" className='text-dark'>
<div>
          <Pie categories={categories?.filter(i=>i.type=='income')}></Pie>
  
</div>        </Tab>

      </Tabs>
          
      </div>
        
    </div>
  )
}

export default Charts