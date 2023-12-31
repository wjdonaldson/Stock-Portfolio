import { useState } from "react";
import * as stocksService from "../../utilities/stocks-service"
import StockQuoteModal from "../StockQuoteModal/StockQuoteModal";
import { Button, Card } from "react-bootstrap";

export default function StockListItem({ stock, handleDeleteStockInterest, handleShowStockBuy, handleShowStockChart }) {
  const [modalShow, setModalShow] = useState(false);
  const [stockQuote, setStockQuote] = useState({});

  async function handleStockQuote(symbol) {
    try {
      setStockQuote({...stock, ...await stocksService.getStockQuote(symbol)});
      setModalShow(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <Card className="mb-1">
        <Card.Body>
          <Card.Title>Symbol: {stock.symbol}</Card.Title>
          <Card.Text><b>Name:</b> {stock.name}</Card.Text>
          <Button 
            className="mx-1"
            variant="secondary"
            size="sm"
            onClick={() => handleDeleteStockInterest(stock)}
          >
            Remove
          </Button>
          <Button 
            className="mx-1"
            variant="secondary"
            size="sm"
            onClick={() => handleStockQuote(stock.symbol)}
          >
            Quote
          </Button>
          <Button 
            className="mx-1"
            variant="secondary"
            size="sm"
            onClick={() => handleShowStockChart(stock)}
          >
            Chart
          </Button>
          <Button 
            className="mx-1"
            variant="primary"
            size="sm"
            onClick={() => handleShowStockBuy(stock)}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>

      { stockQuote && 
        <StockQuoteModal
          modalShow={modalShow}
          setModalShow={setModalShow}
          stockQuote={stockQuote}
        />
      }
    </>
  );
}
