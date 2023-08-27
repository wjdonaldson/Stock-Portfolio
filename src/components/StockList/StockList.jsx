import StockListItem from "../StockListItem/StockListItem";

export default function StockList({ stocks, activeStock, setActiveStock }) {
  const stockList = stocks.map((stock, idx) => (
    <StockListItem
      stock={stock}
      activeStock={activeStock}
      setActiveStock={setActiveStock}
      key={idx}
    />
  ));

  return (
    <>
      { stocks ? stockList : <p>No Stocks</p>}
    </>
  );
}
