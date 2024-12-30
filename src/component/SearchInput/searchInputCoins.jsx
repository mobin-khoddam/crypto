import {Link} from "react-router-dom";
import useSocket from "../../api/useSocket.js";

const SearchInputCoins = ({coin}) => {
    const isSocket = coin.item.symbol.toUpperCase()
    const socket = useSocket(isSocket);
    if (socket.event !== "update") return;
  return (
      <Link to={`/currency/${coin.item.id}`} className='flex justify-between ' key={coin.item.id}>
          <img className='w-7' src={coin.item.image} alt=""/>
          <span className='text-black'>{coin.item.id}</span>
      </Link>
  )
}
export default SearchInputCoins