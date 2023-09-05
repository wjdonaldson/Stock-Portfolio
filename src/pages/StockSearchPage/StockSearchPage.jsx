import { useState } from "react";
import StockSearchForm from "../../components/StockSearchForm/StockSearchForm"
import StockSearchList from "../../components/StockSearchList/StockSearchList"

export default function StockSearchPage({handleNewStockInterest}) {
  const [searchStocks, setSearchStocks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <StockSearchForm
        setSearchStocks={setSearchStocks}
        setIsLoading={setIsLoading}
      />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : (
        searchStocks && 
          <StockSearchList 
          searchStocks={searchStocks} 
          handleNewStockInterest={handleNewStockInterest}
          />
      )}
    </>
  );
}
