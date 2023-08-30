import { useState, useEffect } from "react";
// import * as usersService from "../../utilities/users-service"
import * as stocksService from "../../utilities/stocks-service"
import * as interestListService from "../../utilities/interestList-service"
import StockSearchPage from "../StockSearchPage/StockSearchPage";
import StockList from "../../components/StockList/StockList";
import { Col } from "react-bootstrap";

export default function MainPage() {
  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState(null);

  useEffect(function () {
    async function getInterestList() {
      const interestList = await interestListService.getInterestList();
      console.log(`getInterestList got: ${interestList}`);
      console.log(interestList.user);
      console.log(interestList.stocks);
      if (!interestList) {
        var result = await interestListService.createInterestList();
        console.log(`result = ${result}`);
      }
      setStocks(interestList.stocks);
    }
    getInterestList();
  }, []);

  async function handleNewStockInterest(stockSearch) {
    let stock = null;
    try {
      console.log(stockSearch);
      stock = await stocksService.create(stockSearch);
      console.log('Created stock:');
      console.log(stock);
      await interestListService.addStock(stock);
    }
    catch (e) {
      alert(e);
    }

    // console.log(stock);
    // console.log('Before getStockQuote');
    // const stockQuote = await stocksService.getStockQuote(stock.symbol);
    // console.log('After getStockQuote');
    // console.log(stockQuote);
    // let newStock = {...stockSearch, ...stockQuote};
    // console.log(newStock);
    let newStock = stock;
    var newStocks = stocks;
    newStocks.push(newStock);
    setStocks(newStocks);
    setActiveStock(newStock);
  }

  async function handleDeleteStockInterest(stock) {
    try {
      await interestListService.delStock(stock);
      const newStocks = stocks.filter(s => s !== stock)
      setStocks(newStocks);
      setActiveStock(null);
    }
    catch (e) {
      alert(e);
    }
  }

  return (
    <>
      <Col sm={12} md={4}>
        <StockSearchPage handleNewStockInterest={handleNewStockInterest} />
      </Col>
      <Col sm={12} md={4}>
        <h3>Interest List</h3>
        <StockList 
          stocks={stocks} 
          activeStock={activeStock} 
          setActiveStock={setActiveStock}
          handleDeleteStockInterest={handleDeleteStockInterest}
        />
      </Col>
      <Col sm={12} md={4}>
        <h3>Portfolio</h3>
      </Col>
    </>
  );
}
