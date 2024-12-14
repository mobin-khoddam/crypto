export const isProfitHandler = (current, change, name) => {

    const initialPrice = name !== 'tether' ? current - change : 1

    const priceChangePercentage = (change / initialPrice) * 100;

    if (priceChangePercentage > 0) {
        return {
            title: `${priceChangePercentage.toFixed(2)}%`,
            style: '#66BB6A',
            textStyle: 'text-[#66BB6A]'
        }
    } else if (priceChangePercentage < 0) {
        return {
            title: `${Math.abs(priceChangePercentage).toFixed(2)}%`,
            style: '#EF5350',
            textStyle: 'text-[#EF5350]',
        }
    } else if (priceChangePercentage === 0) {
        return {
            title: '-',
            style: null,
            textStyle: null
        }
    }
}