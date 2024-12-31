import { Link } from "react-router-dom";
import Chart from "../Chart.jsx";
import useSocket from "../../api/useSocket.js";

const Table = ({ coin }) => {
    const data = useSocket(coin?.symbol.toUpperCase())
    const changes = Number(data?.result?.change_percentage).toFixed(2)
    const price = Number(data.result?.last).toFixed(2)

    const color = (data) => {
        if (data < 0 ) {
            return 'text-red-500'
        } else {
            return 'text-green-500'
        }
    }

    if (data.event !== "update") return

    return (
        <div className="flex flex-col gap-4">
            <Link to={`/Currency/${coin.id}`}
                className="grid grid-cols-4 my-2 text-start"
                key={coin.id}>
                <div className='flex items-center gap-4'>
                    <img className="w-10" src={coin.image} alt={coin.name} />
                    <div>
                        <h3 className="font-semibold">{coin.id}</h3>
                        <h3 className="text-gray-500">{coin.symbol}</h3>
                    </div>
                </div>
                <div>
                    <h4 dir='ltr' className={`font-bold text-lg w-fit`}>{isNaN(price) || `$ ${price}`}</h4>
                </div>
                <div>
                    <h4 dir='ltr' className={`w-fit ${color(data.result?.change_percentage)}`}>
                        {isNaN(changes) || `% ${changes}`}
                    </h4>
                </div>
                <Chart name={coin.id}
                       data={coin.sparkline_in_7d.price}
                       height={50} width={150}/>
            </Link>
        </div>
    )
}
export default Table;