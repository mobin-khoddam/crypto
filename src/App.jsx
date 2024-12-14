import Header from "./component/Header/Header.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import {useState} from "react";
import AboutCurrency from "./pages/AboutCurrency.jsx";


export const App = () => {
    const [darkMode, setDarkMode] = useState(!!localStorage.getItem("darkMode"));
    const [currencyUnit, setCurrencyUnit] = useState(localStorage.getItem("currencyUnit") || "usd");
    const [currencyCode, setCurrencyCode] = useState(localStorage.getItem("currenCode") || "en-US");
    const [page, setPage] = useState(1);
    const [data, setData] = useState({});

    console.log(darkMode);
    const darkModeHandler = () => {
        if (darkMode) {
            localStorage.setItem("darkMode", "")
            setDarkMode(false)
        } else {
            localStorage.setItem("darkMode", "dark")
            setDarkMode(true)
        }
    }

    const setDataHandler = (data) => {
        setData(data);
        setPage(2);
    }

    const landingPageHandler = () => {
        setPage(1);
    }

    const currencyUnitHandler = (unit, code) => {
        localStorage.setItem("currencyUnit", unit);
        localStorage.setItem("currenCode", code);
        setCurrencyUnit(unit);
        setCurrencyCode(code);
    }

    return (
        <div
            className={`${darkMode && 'dark'} w-full bg-light-color dark:bg-dark-color duration-300 dark:text-light-color`}>
            <div className='p-6 max-w-[1440px] min-h-screen mx-auto overflow-x-auto'>
                <div className='mt-[70px]'>
                    <Header landingPageHandler={landingPageHandler} darkMode={darkMode} setDarkMode={darkModeHandler}/>
                    {
                        page === 1 ?
                            <LandingPage currencyUnit={currencyUnit} currencyCode={currencyCode} currencyUnitHandler={currencyUnitHandler} setDataHandler={setDataHandler}/>
                            :
                            <AboutCurrency currencyUnit={currencyUnit} currencyCode={currencyCode} data={data}/>
                    }
                </div>
            </div>
        </div>
    )
}

