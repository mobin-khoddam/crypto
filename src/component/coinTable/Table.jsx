import {useNavigate} from "react-router-dom";
import Chart from "../Chart.jsx";
import useSocket from "../../api/useSocket.js";

const Table = ({coin}) => {
    const data = useSocket(coin?.symbol.toUpperCase())
    const changes = Number(data?.result?.change_percentage).toFixed(2)
    const price = Number(data.result?.last)
    const changeCoin = coin.market_cap_change_percentage_24h.toFixed(2)

    const numberFormat = (price) => {
        return new Intl.NumberFormat('en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            }).format(price)
    }


    const color = (data) => {
        if (data < 0) {
            return 'text-red-500'
        } else {
            return 'text-green-500'
        }
    }

    const navigation = useNavigate();

    const navigationHandler = () => {
        navigation(`/Currency/${coin.id}`, {
            state: {
                coin
            }
        })
    }

    return (
        <div className="flex flex-col gap-4">
            <button onClick={navigationHandler}
                    className="grid grid-cols-4 my-2 text-start"
                    key={coin.id}>
                <div className='flex items-center gap-4'>
                    <img className="w-10" src={coin.image} alt={coin.name}/>
                    <div>
                        <h3 className="font-semibold">{coin.id}</h3>
                        <h3 className="text-gray-500">{coin.symbol}</h3>
                    </div>
                </div>
                <div dir='ltr' className={`font-bold text-lg w-fit`}>
                    {
                        data.event !== "update" ? <div>$ {numberFormat(coin.high_24h)}</div> :
                            <h4>{isNaN(price) || `$ ${numberFormat(price)}`}</h4>
                    }

                </div>
                <div dir='ltr' className={`w-fit`}>
                    {
                        data.event !== "update" ?
                            <h4 className={color(coin.market_cap_change_percentage_24h)}>% {changeCoin}</h4> :
                            <h4 className={color(data.result?.change_percentage)}>{isNaN(changes) || `% ${changes}`}</h4>
                    }
                </div>
                <Chart name={coin.id}
                       data={coin.sparkline_in_7d.price}
                       height={50} width={150}/>
            </button>
        </div>
    )
}
export default Table;