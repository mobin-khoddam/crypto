import {Link, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useContext} from "react";
import {DataProvider} from "../../contextApi/provider.js";
import icon from '/src/assets/Bitcoin.svg.png'

const Links = () => {
    const {t} = useTranslation();
    const {landingPageHandler} = useContext(DataProvider)
    const navigate = useNavigate();
  return (
      <>
          <span className='text-[#F79413]'>
              CoinSphere
              </span>
          <img src={icon} className='w-8' alt=""/>
          <Link to='/' onClick={landingPageHandler}
                className='font-semibold border-b-2 border-blue-500 duration-0'>{t("home")}
          </Link>
          <Link to='/page/1' onClick={landingPageHandler}
                className='font-semibold border-b-2 border-blue-500 duration-0'>{t("currencies list")}
          </Link>
          <button onClick={() => {
              landingPageHandler();
              navigate(-1)
          }}
                  className='font-semibold border-b-2 border-red-500 duration-0 text-start'>{t("go back")}
          </button>
      </>
  )
}
export default Links;