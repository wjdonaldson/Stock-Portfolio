import { useState, useEffect } from "react";
import * as stocksService from "../../utilities/stocks-service"
import * as interestListService from "../../utilities/interestList-service"
import * as portfolioService from "../../utilities/portfolios-service"
import StockSearchPage from "../StockSearchPage/StockSearchPage";
import PortfolioPage from "../PortfolioPage/PortfolioPage";
import StockList from "../../components/StockList/StockList";
import StockBuyModal from "../../components/StockBuyModal/stockBuyModal";
import StockChartModal from "../StockChartModal/StockChartModal";
import { Col } from "react-bootstrap";

export default function MainPage() {
  const [stocks, setStocks] = useState([]);
  const [stockBuyModalShow, setStockBuyModalShow] = useState(false);
  const [stockChartModalShow, setStockChartModalShow] = useState(false);
  const [stockToBuy, setStockToBuy] = useState({});
  const [chartData, setChartData] = useState(null);
  const [portfolio, setPortfolio] = useState(null);

  useEffect(function () {
    async function getInterestList() {
      try {
        let interestList = await interestListService.getInterestList();
        if (!interestList) {
          interestList = await interestListService.createInterestList();
        }
        setStocks(interestList.stocks);
      } catch (e) {
          console.error(e.message);
      }
    }
    getInterestList();

    async function getPortfolio() {
      try {
        let userPortfolio = await portfolioService.getPortfolio();
        if (!userPortfolio) {
          userPortfolio = await portfolioService.createPortfolio();
        }
        setPortfolio(userPortfolio);
      } catch (e) {
        console.error(e.message);
      }
    }
    getPortfolio();
  }, []);

  async function handleNewStockInterest(stockSearch) {
    let newStock = null;
    let newStocks = null;
    try {
      newStock = await stocksService.create(stockSearch);
      var newStockInterestList = await interestListService.addStock(newStock);
      newStocks = newStockInterestList.stocks;
    } catch (e) {
      console.error(e.message);
    }
    setStocks(newStocks);
  }

  async function handleDeleteStockInterest(stock) {
    try {
      await interestListService.delStock(stock);
      const newStocks = stocks.filter(s => s !== stock)
      setStocks(newStocks);
    }
    catch (e) {
      console.error(e.message);
    }
  }

  async function handleShowStockBuy(stockSearch) {
    try {
      setStockToBuy({...stockSearch, ...await stocksService.getStockQuote(stockSearch.symbol)});
      setStockBuyModalShow(true);
    } catch (err) {
      console.error(err);
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
      console.error(err);
    }
  }

  async function handleStockSell(purchase) {
    try {
      let stockQuote = await stocksService.getStockQuote(purchase.stock.symbol)
      const purchaseUpdate = {_id: purchase._id, sellPrice: stockQuote.price, sellDate: new Date()};
      const newPortfolio = await portfolioService.updatePurchase(purchaseUpdate);
      setPortfolio(newPortfolio);
      } catch (err) {
        console.error(err);
      }
    }

    async function handleShowStockChart(symbol) {
      try {
        if(!chartData) {
          console.log("getting chart data");
          setChartData(await stocksService.getStockTimeSeriesDaily(symbol));
        } else {
          console.log("NOT getting chart data");
          setChartData(chartData);
        }

        setStockChartModalShow(true);
      } catch (err) {
        console.error(err);
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
          handleDeleteStockInterest={handleDeleteStockInterest}
          handleShowStockBuy={handleShowStockBuy}
          handleShowStockChart={handleShowStockChart}
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

      { chartData && 
        <StockChartModal
          chartData={chartData}
          modalShow={stockChartModalShow}
          setModalShow={setStockChartModalShow}
        />
      }
    </>
  );
}
