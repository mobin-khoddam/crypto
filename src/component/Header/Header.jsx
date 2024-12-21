import HeaderDarkModeIcon from "./HeaderDarkModeIcon.jsx";
import {useTranslation} from "react-i18next";
import translate from '/src/assets/img.png'

const Header = ({darkMode, setDarkMode, landingPageHandler}) => {

    const {t, i18n} = useTranslation();

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    }

  return (
      <div
          className='fixed top-0 right-0 left-0 flex items-center justify-between gap-10 z-10 bg-light-color dark:bg-dark-color w-[1440px] p-4 duration-300 mx-auto'>
          <div className='flex items-center gap-4 '>
              <span className='text-[#F79413]'>
              CoinSphere
              </span>
              <img src="/src/assets/Bitcoin.svg.png" className='w-8' alt=""/>
              <button onClick={landingPageHandler}
                      className='font-semibold border-b-2 border-blue-500 duration-0'>{t("home")}
              </button>
          </div>
          <span
              className='absolute bottom-0 h-[2px] w-full bg-dark-color dark:bg-light-color'></span>
          <div className='flex items-center gap-4'>
              <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button"><img className='w-8' src={translate} alt=""/></div>
                  <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                      <li className='text-dark-color' onClick={() => changeLanguage("en")}><a>english</a></li>
                      <li className='text-dark-color' onClick={() => changeLanguage("fa")}><a>farsi</a></li>
                  </ul>
              </div>
              <HeaderDarkModeIcon darkMode={darkMode} setDarkMode={setDarkMode}/>
          </div>
      </div>
  )
}
export default Header