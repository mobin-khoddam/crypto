import { createBrowserRouter } from "react-router-dom";
import CryptoPage from "./pages/CryptoPage.jsx";
import AboutCurrency from "./pages/AboutCurrency.jsx";
import HomePage from "./pages/HomePage.jsx";
import Layout from "./Layout.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Layout>
                <HomePage />
            </Layout>
        ),
    },
    {
        path: "/page/:page",
        element: (
            <Layout>
                <CryptoPage />
            </Layout>
        )
    },
    {
        path: "/Currency/:coin",
        element: (
            <Layout>
                <AboutCurrency />
            </Layout>
        )
    }
]);
