import {createBrowserRouter} from "react-router-dom";
import CryptoPage from "./pages/./CryptoPage.jsx";
import AboutCurrency from "./pages/AboutCurrency.jsx";
import Header from "./component/Header/Header.jsx";
import HomePage from "./pages/HomePage.jsx";

export const router = createBrowserRouter([
    {
      path: '/',
      element: (
          <>
              <Header />
              <HomePage />
          </>
      ),
    },
    {
        path: "/page/:page",
        element: (
            <>
                <Header/>
                <CryptoPage/>
            </>
        )
    },
    {
        path: "/Currency/:coin",
        element: (
            <>
                <Header/>
                <AboutCurrency/>
            </>
        )
    }
])
