//Bar plot of favorite Pets of the website
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush, ReferenceLine } from 'recharts';

const FavoritePetsBarPlot = ({ favoritePets }) => {
    

    return (

        <BarChart width={1000} height={500} data={favoritePets}
            margin={{ top: 20, right: 5, left: 5, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis interval={1} />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
            <ReferenceLine y={0} stroke='#000' />
            <Brush dataKey='name' height={30} stroke="#8884d8" endIndex={10} />
            <Bar dataKey="likeCounter" fill="#8884d8" label={{ position: 'top' }} />
        </BarChart>
    );
}

export default FavoritePetsBarPlot;