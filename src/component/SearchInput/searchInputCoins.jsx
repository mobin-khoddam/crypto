import {useNavigate} from "react-router-dom";

const SearchInputCoins = ({coin}) => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate(`/currency/${coin.item.id}`, {
            state: {
                coin: coin.item
            }
        })
    }
  return (
      <button onClick={navigateHandler} className='flex justify-between ' key={coin.item.id}>
          <img className='w-7' src={coin.item.image} alt=""/>
          <span className='text-black'>{coin.item.id}</span>
      </button>
  )
}
export default SearchInputCoins