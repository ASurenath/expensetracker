import React, { useEffect, useState } from 'react'
import { getFinancesExpandApi } from '../apiservice/allApi'
import Finance from './Finance'


function Finances({ updatefinances, setupdatefinances }) {
    //____________States_______________
    const [finances, setfinances] = useState([])
    const [loaded, setloaded] = useState(false)
    const [balance, setbalance] = useState(0)

    //___________API calls___________
    const getfinances = async () => {
        const result = await getFinancesExpandApi()
        if (result.status >= 200 && result.status < 300) {
            setfinances(result.data)
            setloaded(true)
        }
        else{
            await getfinances()               //remove before hosting
        }
    }
    //___________UseEffects___________
    useEffect(() => { getfinances() }, [updatefinances])
    useEffect(() => { calculateBalance() }, [finances])
    //___________Other functions_________
    const calculateBalance = () => {
        let sum = 0
        finances?.map(i => {
            i?.type == "income" ? sum += Number(i?.amount) : sum -= Number(i?.amount);
        }
        );
        setbalance(sum)
    }

    return (
        <>

            <h1 className={balance > 0 ? 'fw-light p-3 m-3 w-75 border border-success rounded-4 mx-auto'
                : 'fw-light p-3 m-3 w-75 border border-success rounded-4 mx-auto exp'}>Balance: ₹{balance}</h1>
            {loaded ? finances?.length > 0 ? finances?.map(i =>
                <Finance f={i} setupdatefinances={setupdatefinances}></Finance>
            )
                : "No transactions to show"
                : "loading..."
            }

        </>
    )
}

export default Finances