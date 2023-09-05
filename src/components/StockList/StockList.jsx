import StockListItem from "../StockListItem/StockListItem";

export default function StockList({ stocks, handleDeleteStockInterest, handleShowStockBuy, handleShowStockChart }) {

  // console.log('In function StockList()');
  // console.log(stocks);
  let stockList = (<p>No Stocks</p>);
  if (stocks) {
    stockList = stocks.map((stock, idx) => {
      return (
        <StockListItem
          stock={stock}
          handleDeleteStockInterest={handleDeleteStockInterest}
          handleShowStockBuy={handleShowStockBuy}
          handleShowStockChart={handleShowStockChart}
          key={idx}
        />
      )
    });
  }

  return (
    <>
      {stockList}
      {/* { stocks ? stockList : (<p>No Stocks</p>)} */}
    </>
  );
}
