import {useEffect, useState} from "react";

const useSocket = (data) => {

    const [socketData, setSocketData] = useState([]);
    useEffect(() => {
        const socket = new WebSocket("wss://api.gateio.ws/ws/v4/")

        socket.onopen = () => {
            socket.send(JSON.stringify({
                channel: "spot.tickers",
                event: "subscribe",
                payload: [`${data}_USDT`]
        }))
        }

        socket.onmessage = (data) => {
            const result = (JSON.parse(data.data));
            console.log(result)
            const update = result.event === "update" && result
            setSocketData(update);
        }


        return () => {
            socket.close()
        }
    }, [data])
    return socketData
}

export default useSocket