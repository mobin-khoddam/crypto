import {LineChart, Line, YAxis, XAxis} from 'recharts';


const Chart = ({profitColor, data, width, height, bigChart}) => {

    const chartDataMaker = data.map(data => ({
        price: data
    }));

    return (
        <LineChart width={width} height={height} data={chartDataMaker}>
            {
                bigChart ?
                    <>
                        <YAxis domain={['auto']} tick={true} axisLine={true} hide={false} />
                        <XAxis/>
                    </>
                    :
                    <YAxis domain={['auto']} tick={false} axisLine={false} hide={true}/>
            }
            <Line type="number" dataKey="price" stroke={profitColor} dot={false} strokeWidth={bigChart && 2}/>
        </LineChart>
    );
};

export default Chart;