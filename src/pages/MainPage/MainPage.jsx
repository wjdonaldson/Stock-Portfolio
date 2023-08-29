import { useState, useEffect } from "react";
import * as usersService from "../../utilities/users-service"
import * as stocksService from "../../utilities/stocks-service"
import StockSearchPage from "../StockSearchPage/StockSearchPage";
import StockList from "../../components/StockList/StockList";
import { Col } from "react-bootstrap";

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
      <Col sm={12} md={4}>
        <StockSearchPage />
      </Col>
      <Col sm={12} md={4}>
        <h3>Interest List</h3>
        <StockList stocks={stocks} activeStock={activeStock} setActiveStock={setActiveStock} />
      </Col>
      <Col sm={12} md={4}>
        <h3>Portfolio</h3>
      </Col>
    </>
  );
}
