import StockListItem from "../StockListItem/StockListItem";

export default function StockList({ stocks, activeStock, setActiveStock, handleDeleteStockInterest, handleShowStockBuy }) {
  
  const stockList = stocks.map((stock, idx) => {
    if (stock) {
      return (
        <StockListItem
          stock={stock}
          activeStock={activeStock}
          setActiveStock={setActiveStock}
          handleDeleteStockInterest={handleDeleteStockInterest}
          handleShowStockBuy={handleShowStockBuy}
          key={idx}
        />
      )
    }
    return null;
  });


  return (
    <>
      { stocks ? stockList : (<p>No Stocks</p>)}
    </>
  );
}
