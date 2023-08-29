import { useState, useEffect } from "react";
import StockSearchForm from "../../components/StockSearchForm/StockSearchForm"
import StockSearchList from "../../components/StockSearchList/StockSearchList"

export default function StockSearchPage({handleNewStockInterest}) {
  const [searchStocks, setSearchStocks] = useState(null);
  const [activeStock, setActiveStock] = useState(null);

  useEffect(function () {
    if (activeStock) {
      handleNewStockInterest(activeStock);
    }
  }, [activeStock]);

  return (
    <>
      <StockSearchForm setSearchStocks={setSearchStocks} />
      {searchStocks && 
      <StockSearchList 
        searchStocks={searchStocks} 
        activeStock={activeStock} 
        setActiveStock={setActiveStock}
      />}
    </>
  );
}
