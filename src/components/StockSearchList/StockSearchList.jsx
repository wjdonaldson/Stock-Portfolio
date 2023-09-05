import StockSearchListItem from "../StockSearchListItem/StockSearchListItem";
import { Accordion } from "react-bootstrap";

export default function StockSearchList({ searchStocks, handleNewStockInterest }) {
  const stockSearchList = searchStocks.map((stock, idx) => (
    <StockSearchListItem
      stock={stock}
      handleNewStockInterest={handleNewStockInterest}
      idx={idx}
      key={idx}
    />
  ));

  return (
    <>
      <Accordion alwaysOpen>
        { searchStocks ? stockSearchList : (<h2>Loading...</h2>)}
      </Accordion>
    </>
  );
}
