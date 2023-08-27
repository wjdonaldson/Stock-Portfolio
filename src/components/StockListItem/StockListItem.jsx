export default function StockListItem({ stock, activeStock, setActiveStock}) {
  return (
    <>
      <p>Symbol: {stock.symbol}</p>
      <p>Open: {stock.open}</p>
      <p>High: {stock.high}</p>
      <p>Low: {stock.low}</p>
      <p>Price: {stock.price}</p>
      <p>Volume: {stock.volume}</p>
      <p>Latest Trading Day: {stock.latestTradingDay}</p>
      <p>Previous Close: {stock.previousClose}</p>
      <p>Change: {stock.change}</p>
      <p>Change Percent: {stock.changePercent}</p>
    </>
  );
}
