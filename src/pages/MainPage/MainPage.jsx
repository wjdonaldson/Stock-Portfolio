import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service"
import * as stocksService from "../../utilities/stocks-service"
import StockList from "../../components/StockList/StockList";

export default function MainPage() {
  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState(null);

  useEffect(function () {
    async function getStock() {
      const stock = await stocksService.getStock('IBM');
      setActiveStock(stock);
      var newStocks = [];
      newStocks.push(stock);
      setStocks(newStocks);
    }
    getStock();
  }, []);

  async function handleCheckToken(){
    const expDate = await usersService.checkToken();
    alert(expDate);
  }

  return (
    <>
      <h1>MainPage</h1>
      <StockList stocks={stocks} activeStock={activeStock} setActiveStock={setActiveStock} />
    </>
  );
}
