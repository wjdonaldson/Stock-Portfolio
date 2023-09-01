import StockSearchListItem from "../StockSearchListItem/StockSearchListItem";

export default function StockSearchList({ searchStocks, handleNewStockInterest }) {
  const stockSearchList = searchStocks.map((stock, idx) => (
    <StockSearchListItem
      stock={stock}
      handleNewStockInterest={handleNewStockInterest}
      key={idx}
    />
  ));

  return (
    <>
      { searchStocks ? stockSearchList : (<h2>Loading...</h2>)}
    </>
  );
}
