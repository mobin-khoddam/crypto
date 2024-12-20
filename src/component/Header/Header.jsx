import HeaderDarkModeIcon from "./HeaderDarkModeIcon.jsx";

const Header = ({darkMode, setDarkMode, landingPageHandler}) => {
  return (
      <div className='fixed top-0 right-0 left-0 flex items-center justify-between gap-10 z-10 bg-light-color dark:bg-dark-color w-[1440px] p-4 duration-300 mx-auto'>
          <div className='flex items-center gap-4 '>
              <span className='text-[#F79413]'>
              CoinSphere
              </span>
              <img src="/src/assets/Bitcoin.svg.png" className='w-8' alt=""/>
              <button onClick={landingPageHandler} className='font-semibold border-b-2 border-blue-500 duration-0'>Home</button>
          </div>
          <span
              className='absolute bottom-0 h-[2px] w-full bg-dark-color dark:bg-light-color'></span>
          <HeaderDarkModeIcon darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
  )
}
export default Header