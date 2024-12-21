import {Link, useNavigate} from "react-router-dom";
import {useCryptoApi} from "../../api/useCryptoApi.js";
import {DataProvider} from "../../contextApi/provider.js";
import {useContext} from "react";
import {useTranslation} from "react-i18next";
import Links from "./Links.jsx";

const DesktopHeader = () => {

  return (
          <div className='hidden items-center gap-4 sm:flex'>
              <Links />
          </div>
  )
}
export default DesktopHeader;