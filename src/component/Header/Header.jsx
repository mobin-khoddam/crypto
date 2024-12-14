import HeaderDarkModeIcon from "./HeaderDarkModeIcon.jsx";

const Header = ({darkMode, setDarkMode, landingPageHandler}) => {
  return (
      <div className='fixed top-0 right-0 left-0 flex items-center z-10 bg-light-color dark:bg-dark-color w-[1440px] p-4 duration-300 mx-auto'>
        <HeaderDarkModeIcon darkMode={darkMode} setDarkMode={setDarkMode} />
          <button onClick={landingPageHandler} className='ml-10' >Home</button>
      </div>
  )
}
export default Header