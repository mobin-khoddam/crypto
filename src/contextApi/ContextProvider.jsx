import {DataProvider} from "./provider.js";

const ContextProvider = ({children, value}) => {
    return <DataProvider.Provider value={value}>{children}</DataProvider.Provider>
}
export default ContextProvider;

