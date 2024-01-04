import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'


function Pie({ categories }) {
    const [data, setdata] = useState({})
    const getdata = () => {
        const L = [["Categories", "Total amount"]]
        for (let category of categories) {
            let sum = 0
            for (let finance of category?.finances) {
                sum += +finance.amount
            }
            L.push([category.title, sum])
        }
        setdata(L)
    }
    useEffect(() => { getdata() }, [categories])

    console.log(data);


    return (
        <Chart
            chartType="PieChart"
            width='100%'
            height='100%'
            data={data}
            loader={<div>Loading Chart</div>}
            options={{
                is3D: true,
                animation: {
                    startup: true,
                    easing: "linear",
                    duration: 1500
                },
                width: '100%',
                    height: '100%',
                    chartArea: {
                        left: "3%",
                        top: "5%",
                        height: "94%",
                        width: "94%"
                    },

            }}
        legendToggle
        />
    )
}

export default Pie