import StockSearchListItem from "../StockSearchListItem/StockSearchListItem";

export default function StockSearchList({ searchStocks, activeStock, setActiveStock }) {
  const stockSearchList = searchStocks.map((stock, idx) => (
    <StockSearchListItem
      stock={stock}
      activeStock={activeStock}
      setActiveStock={setActiveStock}
      key={idx}
    />
  ));

  return (
    <>
      { searchStocks ? stockSearchList : ""}
    </>
  );
}
