import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import icon from '/src/assets/Bitcoin.svg.png'

const Links = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
  return (
      <>
          <span className='text-[#F79413]'>
              CoinSphere
              </span>
          <img src={icon} className='w-8' alt=""/>
          <Link to='/'
                className='font-semibold border-b-2 border-blue-500 duration-0 w-fit'>{t("home")}
          </Link>
          <Link to='/page/1'
                className='font-semibold border-b-2 border-blue-500 duration-0 w-fit'>{t("currencies list")}
          </Link>
          <button onClick={() => {
              navigate(-1)
          }}
                  className='font-semibold border-b-2 border-red-500 duration-0 text-start w-fit'>{t("go back")}
          </button>
      </>
  )
}
export default Links;