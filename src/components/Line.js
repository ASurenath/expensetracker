import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'


function Line({finances}) {
    const [data, setdata] = useState({})
    const getdata = () => {
        const L = [["Date","Expense","Income"]]
        for(let finance of finances) {
            if(finance.type=='expense'){
                L.push([new Date(+finance.date),+finance?.amount,null])
            }
            else{
                L.push([new Date(+finance.date),null,+finance?.amount])
            }
            
        }
        setdata(L)
    }
    useEffect(() => {getdata()}, [finances])
    
    console.log(data);


  return (
    <Chart
                chartType="AreaChart"
                data={data}
                width="100%"
                options={{is3D: true,
                    animation: {
                        startup: true,
                        easing: "linear",
                        duration: 1500,
                      }
                    }}
                // legendToggle
            />
  )
}

export default Line