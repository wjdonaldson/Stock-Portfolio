import { Accordion, Button } from "react-bootstrap";
import { useRef, useState } from "react"
import * as stocksService from "../../utilities/stocks-service"

export default function PurchaseListItem({ purchase, idx, handleStockSell }) {
  const [isLoading, setIsLoading] = useState(false);
  const stockQuote = useRef(null);
  let stockIsSold = (purchase.sellPrice > 0);
  
  function DtoS(dateParam) {
    if (dateParam) {
      const dt = new Date(dateParam);
      return dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString();
    }
    else
      return '---';
  }

  let USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  async function handleAccordionClick(evt) {
    if (stockIsSold) {
      stockQuote.current = null;
    } else {
      setIsLoading(true);
      stocksService.getStockQuote(purchase.stock.symbol)
      .then(quote => {
        if (quote == null) {
          alert("Couldn't get current price. Please try again later.");
        }
        stockQuote.current = quote;
        setIsLoading(false);
      });
    }
  }
  
  let accordionContent = (<h4>Loading...</h4>);

  if (!isLoading) {
    let gainLoss = null;
    if (stockIsSold) {
      gainLoss = (purchase.sellPrice - purchase.buyPrice) * purchase.quantity;
    } else {
      if (stockQuote.current) {
        gainLoss = (stockQuote.current.price - purchase.buyPrice) * purchase.quantity;
      }
    }
    const percentage = (Math.abs(gainLoss) / purchase.buyPrice / purchase.quantity * 100).toFixed(2);

    accordionContent = (
    <>
      <div><b>Purchase Date:</b> {DtoS(purchase.buyDate)}</div>
      <div><b>Quantity:</b> {purchase.quantity}</div>
      <div><b>Purchase Price:</b> {USDollar.format(purchase.buyPrice)}</div>
      <div><b>Total:</b> {USDollar.format(purchase.buyPrice*purchase.quantity)}</div>
      {stockIsSold ? (
        <>
          <div><b>Sell Date:</b> {DtoS(purchase.sellDate)}</div>
          <div><b>Sell Price:</b> {purchase.sellPrice ? USDollar.format(purchase.sellPrice) : '---'}</div>
          { gainLoss >= 0 ? (
            <div style={{color: "green"}}><b>Gain:</b> {`${USDollar.format(gainLoss)} (${percentage}%)`}</div>
          ) : (
            <div style={{color: "red"}}><b>Loss:</b> {`${USDollar.format(gainLoss)} (${percentage}%)`}</div>
          )}
        </>
      ) : (
        <>
          <div><b>Current Price:</b> {stockQuote.current ? USDollar.format(stockQuote.current.price) : '---'}</div>
          { gainLoss >= 0 ? (
            <div style={{color: "green"}}><b>Currently Up:</b> {`${USDollar.format(gainLoss)} (${percentage}%)`}</div>
          ) : (
            <div style={{color: "red"}}><b>Currently Down:</b> {`${USDollar.format(gainLoss)} (${percentage}%)`}</div>
          )}
        </>
      )}
      <br />
      <Button disabled={stockIsSold} // disable the 'Sell' button if it is already sold
        className="mx-1"
        variant="primary"
        size="sm"
        onClick={() => handleStockSell(purchase)}
        >
        Sell
      </Button>
    </>
    )
  };

  return (
    <>
      <Accordion.Item className="mb-2" eventKey={`${idx}`}>
        <Accordion.Header>
        <span>
          <div><b>Symbol:</b> {purchase.stock.symbol}</div>
          <div><b>Name:</b> {purchase.stock.name}</div>
        </span>
        </Accordion.Header>
        <Accordion.Body
          onEntering={handleAccordionClick}
        >
          {accordionContent}
        </Accordion.Body>
      </Accordion.Item>
    </>
  );
}
