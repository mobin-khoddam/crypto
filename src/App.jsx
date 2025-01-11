import {useEffect, useRef, useState} from "react";
import '../public/locales/translator.js'
import {useTranslation} from "react-i18next";
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import ContextProvider from "./contextApi/ContextProvider.jsx";




export const App = () => {
    const [darkMode, setDarkMode] = useState(!!localStorage.getItem("darkMode"));

    const darkModeHandler = () => {
        if (darkMode) {
            localStorage.setItem("darkMode", "")
            setDarkMode(false)
        } else {
            localStorage.setItem("darkMode", "dark")
            setDarkMode(true)
        }
    }



    const {i18n} = useTranslation();
    const langRef = useRef(null);
    useEffect(() => {
        if (i18n.language === "fa") {
            langRef.current.style.direction = "rtl"
        } else {
            langRef.current.style.direction = "ltr"
        }
    })

    return (
        <div
            ref={langRef}
            className={`${darkMode && 'dark'} w-full bg-light-color dark:bg-dark-color duration-300 dark:text-light-color`}>
            <div className='p-6 max-w-[1440px] min-h-screen mx-auto overflow-x-auto'>
                <div className='mt-[100px] min-h-screen'>
                    <ContextProvider value={{darkMode, darkModeHandler }}>
                        <RouterProvider  router={router} />
                    </ContextProvider>
                </div>
            </div>
        </div>
    )
}

