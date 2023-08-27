import * as usersService from "../../utilities/users-service"
import * as stocksService from "../../utilities/stocks-service"
import { useState, useEffect } from "react";
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
      <button onClick={handleCheckToken}>Check When My Login Expires</button>
      <StockList stocks={stocks} activeStock={activeStock} setActiveStock={setActiveStock} />
    </>
  );
}
