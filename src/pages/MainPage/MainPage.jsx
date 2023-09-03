import { useState, useEffect } from "react";
import * as stocksService from "../../utilities/stocks-service"
import * as interestListService from "../../utilities/interestList-service"
import * as portfolioService from "../../utilities/portfolios-service"
import StockSearchPage from "../StockSearchPage/StockSearchPage";
import PortfolioPage from "../PortfolioPage/PortfolioPage";
import StockList from "../../components/StockList/StockList";
import StockBuyModal from "../../components/StockBuyModal/stockBuyModal";
import { Col } from "react-bootstrap";

export default function MainPage() {
  const [stocks, setStocks] = useState([]);
  const [activeStock, setActiveStock] = useState(null);
  const [stockBuyModalShow, setStockBuyModalShow] = useState(false);
  const [stockToBuy, setStockToBuy] = useState({});
  const [portfolio, setPortfolio] = useState(null);

  useEffect(function () {
    async function getInterestList() {
      const interestList = await interestListService.getInterestList();
      if (!interestList) {
        var result = await interestListService.createInterestList();
        console.log(`result = ${result}`);
      }
      setStocks(interestList.stocks);
    }
    getInterestList();

    async function getPortfolio() {
      const userPortfolio = await portfolioService.getPortfolio();
      if (!userPortfolio) {
        var result = await portfolioService.createPortfolio();
        console.log(`result = ${result}`);
      }
      setPortfolio(userPortfolio);
    }
    getPortfolio();
  }, []);

  async function handleNewStockInterest(stockSearch) {
    let stock = null;
    try {
      stock = await stocksService.create(stockSearch);
      await interestListService.addStock(stock);
    }
    catch (e) {
      alert(e);
    }
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

  async function handleShowStockBuy(stockSearch) {
    try {
      setStockToBuy({...stockSearch, ...await stocksService.getStockQuote(stockSearch.symbol)});
      setStockBuyModalShow(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleStockBuy(stockToBuy, quantity) {
    try {
      let purchase = {
        stock: stockToBuy,
        quantity: quantity,
        buyPrice: stockToBuy.price,
        buyDate: new Date()
      }
      const newPortfolio = await portfolioService.addPurchase(purchase);
      setPortfolio(newPortfolio);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleStockSell(purchase) {
    try {
      let stockQuote = await stocksService.getStockQuote(purchase.stock.symbol)
      const purchaseUpdate = {_id: purchase._id, sellPrice: stockQuote.price, sellDate: new Date()};
      const newPortfolio = await portfolioService.updatePurchase(purchaseUpdate);
      setPortfolio(newPortfolio);
      } catch (err) {
        console.error(err.message);
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
          handleShowStockBuy={handleShowStockBuy}
        />
      </Col>
      <Col sm={12} md={4}>
        <h3>Portfolio</h3>
        <PortfolioPage 
          portfolio={portfolio}
          handleStockSell={handleStockSell}
        />
      </Col>

      { stockToBuy && 
        <StockBuyModal
          stockBuyModalShow={stockBuyModalShow}
          setStockBuyModalShow={setStockBuyModalShow}
          stockQuote={stockToBuy}
          handleStockBuy={handleStockBuy}
        />
      }
    </>
  );
}
