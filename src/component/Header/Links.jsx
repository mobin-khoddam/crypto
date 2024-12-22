import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import icon from '/src/assets/Bitcoin.svg.png'

const Links = () => {
    const {t} = useTranslation();

  return (
      <>
          <span className='text-[#F79413]'>
              CoinSphere
              </span>
          <img src={icon} className='w-8' alt=""/>
          <Link to='/'
                className='font-semibold duration-0 w-fit'>{t("home")}
          </Link>
          <Link to='/page/1'
                className='font-semibold duration-0 w-fit'>{t("currencies list")}
          </Link>
      </>
  )
}
export default Links;