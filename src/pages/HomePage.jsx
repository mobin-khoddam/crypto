import {useTranslation} from "react-i18next";
import icon from '/src/assets/blueIcon.png'
import {Link} from "react-router-dom";

const HomePage = () => {
    const {t} = useTranslation();
  return (
      <div className='flex flex-col gap-8 items-center justify-center text-center'>
          <img className='w-44 max-sm:w-36' src={icon} alt=""/>
          <span className='text-2xl font-semibold'>{t('welcome')}</span>
          <span className='text-2xl'>{t('get start')}</span>
          <Link className='bg-[#03B8FF] px-4 py-2 rounded-box hover:bg-[#03B8FF]/80 text-white' to='/page/1'>{t("enter button")}</Link>
      </div>
  )
}
export default HomePage