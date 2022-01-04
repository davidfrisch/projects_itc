//View adopted/fostered pet and return pets
//3 lines chart. 1/AdoptedFostered 2/Return 3/Average

import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// const processDataForLineChart = (data) => {
//     //x-axis - timestamp from to 
//     const dataPerDate = data.map((transaction) => ({ ...transaction, timestamp: transaction.timestamp.split('T')[0] }))

//     const dataPerCountDate = dataPerDate.map((transaction) => {
//         const countAdoptFosterPerDay = dataPerDate.filter((tempTra) => tempTra.timestamp === transaction.timestamp && ['adopt', 'foster'].includes(tempTra.action)).length
//         const countReturnedPetsPerDay = dataPerDate.filter((tempTra) => tempTra.timestamp === transaction.timestamp && 'return' === tempTra.action).length
//         return { timestamp: transaction.timestamp, countAdoptFosterPerDay, countReturnedPetsPerDay }
//     })

//     const uniques = dataPerCountDate.filter((v, i, a) => a.findIndex(t => (t.timestamp === v.timestamp)) === i)

//     for (let i = 0; i < uniques.length; i++) {
//         if (i === 0) {
//             uniques[i]['diff'] = uniques[i].countAdoptFosterPerDay - uniques[i].countReturnedPetsPerDay
//         } else {
//             console.log(uniques[i - 1].diff)
//             uniques[i]['diff'] = uniques[i - 1].diff + (uniques[i].countAdoptFosterPerDay - uniques[i].countReturnedPetsPerDay)
//         }
//     }

//     console.log(uniques)
//     return uniques
// }

const PetsAdoptionStatusChart = ({ data }) => {



    return (
        <LineChart
            width={1000}
            height={300}
            data={data}
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}>
        
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp"/>
            <YAxis />
            <Tooltip />
            <Legend  verticalAlign="top" height={36}/>
            <Line type="monotone" dataKey="countAdoptFosterPerDay" stroke="#00C49F" name="#Pets adopt or foster on that day" />
            <Line type="monotone" dataKey="countReturnedPetsPerDay" stroke="#FFBB28" name='#Pets returned on that day' />
            <Line type="monotone" dataKey="diff" stroke="#0088FE" name='Current difference between adoptions and returns' />


        </LineChart>
    );
}

export default PetsAdoptionStatusChart;