import {LineChart, Line, YAxis} from 'recharts';


const Chart = ({profitColor, data, width, height}) => {

    const chartDataMaker = data.map(item => ({
        price: item
    }));

    return (
        <LineChart width={width} height={height} data={chartDataMaker}>
            <YAxis domain={['auto']} tick={false} axisLine={false} hide={true}/>
            <Line type="number" dataKey="price" stroke={profitColor} dot={false}/>
        </LineChart>
    );
};

export default Chart;
