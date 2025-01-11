import {ToastContainer, toast} from 'react-toastify';
import {useEffect} from "react";
import {useTranslation} from "react-i18next";

const Toastify = () => {
    const {t} = useTranslation()
    const notify = () => toast.warning(t("toast message"));
    useEffect(() => {
        notify()
    }, [])
    return (
        <div >
            <ToastContainer position="top-center" />
        </div>
    )
}
export default Toastify