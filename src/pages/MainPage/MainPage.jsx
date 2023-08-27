import * as usersService from "../../utilities/users-service"
import * as stocksService from "../../utilities/stocks-service"
import { useState, useEffect } from "react";
import StockList from "../../components/StockList/StockList";

export default function MainPage() {
  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState(null);

  useEffect(function () {
    async function getStock() {
      const stockQuote = await stocksService.getStock();
      const stock = {
        symbol: stockQuote["Global Quote"]["01. symbol"],
        open: stockQuote["Global Quote"]["02. open"],
        high: stockQuote["Global Quote"]["03. high"],
        low: stockQuote["Global Quote"]["04. low"],
        price: stockQuote["Global Quote"]["05. price"],
        volume: stockQuote["Global Quote"]["06. volume"],
        latestTradingDay: stockQuote["Global Quote"]["07. latest trading day"],
        previousClose: stockQuote["Global Quote"]["08. previous close"],
        change: stockQuote["Global Quote"]["09. change"],
        changePercent: stockQuote["Global Quote"]["10. change percent"]
      }
        // 01. symbol, 02. open, 03. high, 04. low, 05. price, 06. volume, 07. latest trading day, 08. previous close, 09. change, 10. change percent
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
