import { ChartData } from '../../types/Models';

export const getPriceChartData = async (coinId: string, time: number) => {
  let data: ChartData[] = [];
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coinId}&vs_currencies=usd`,
    );
    const coinPrice = await response.json();
    const curPrice = coinPrice[coinId].usd;
    const now = Math.floor(new Date().valueOf() / 1000);
    const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart/range?vs_currency=usd&from=${
      now - time
    }&to=${now}`;
    const result = await fetch(url);
    const resData = await result.json();
    if (resData.prices) {
      const puts: number[] = resData.prices.map((x: any) => x[1]);
      const min: number = Math.min(...puts, coinPrice[coinId].usd);
      data = resData.prices.map((x: any) => {
        return { time: x[0], y_position: x[1] - min, price: x[1] };
      });
      data.push({
        time: Date.now(),
        y_position: coinPrice[coinId].usd - min,
        price: coinPrice[coinId].usd,
      });
    }
    return { curPrice, data };
  } catch (err) {
    console.log(err);
  }
};
