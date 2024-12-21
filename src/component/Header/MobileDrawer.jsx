import DesktopHeader from "./DesktopHeader.jsx";
import Links from "./Links.jsx";

const MobileDrawer = () => {
  return (
      <div className="drawer hidden max-sm:block">
          <input id="my-drawer" type="checkbox" className="drawer-toggle"/>
          <div className="drawer-content">
              {/* Page content here */}
              <label htmlFor="my-drawer" className="drawer-button"><img className='w-8' src='/src/assets/burger.png' alt='' /></label>
          </div>
          <div className="drawer-side z-10">
              <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu min-h-full w-48 p-4 bg-light-color dark:bg-dark-color dark:text-light-color flex flex-col gap-4">
                  {/* Sidebar content here */}
                  <Links />
              </ul>
          </div>
      </div>
  )
}
export default MobileDrawer