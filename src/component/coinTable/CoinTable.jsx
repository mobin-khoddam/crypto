import Loading from "../Loading.jsx";
import Error from "../Error.jsx";
import {useTranslation} from "react-i18next";
import Table from "./Table.jsx";

const CoinTable = ({coins, isLoading, error}) => {

    const {t} = useTranslation();
    return (
        <div className='min-w-[900px]'>
            <ul className='grid grid-cols-4 mb-6'>
                <li>{t("currency name")}</li>
                <li>{t("price") + ` (USDT)`}</li>
                <li>{t("changes")}</li>
                <li>{t("Chart of changes")}</li>
            </ul>
            {isLoading ? <Loading/> :
                error ? <Error error={error}/> :
                    coins.map((coin) => {
                        return (
                            <Table key={coin.id} coin={coin} />
                        )
                    })}
        </div>
    )
}
export default CoinTable;