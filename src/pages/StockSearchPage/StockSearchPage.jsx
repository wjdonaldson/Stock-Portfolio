import { useState, useEffect } from "react";
import StockSearchForm from "../../components/StockSearchForm/StockSearchForm"
import StockSearchList from "../../components/StockSearchList/StockSearchList"

export default function StockSearchPage() {
  const [searchStocks, setSearchStocks] = useState(null);

  return (
    <>
      <h1>StockSearchPage</h1>
      <StockSearchForm setSearchStocks={setSearchStocks} />
      {searchStocks && <StockSearchList searchStocks={searchStocks} />}
    </>
  );
}
