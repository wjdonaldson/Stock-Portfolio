import { Accordion, Button } from "react-bootstrap";
import { useRef, useState } from "react"
import * as stocksService from "../../utilities/stocks-service"

export default function PurchaseListItem({ purchase, idx, handleStockSell }) {
  const [isLoading, setIsLoading] = useState(false);
  const stockQuote = useRef(null);
  const stockIsSold = useRef(purchase.sellPrice > 0);

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
    if (stockIsSold.current) {
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
    accordionContent = (
    <>
      <div><b>Purchase Date:</b> {DtoS(purchase.buyDate)}</div>
      <div><b>Quantity:</b> {purchase.quantity}</div>
      <div><b>Purchase Price:</b> {USDollar.format(purchase.buyPrice)}</div>
      <div><b>Total:</b> {USDollar.format(purchase.buyPrice*purchase.quantity)}</div>
      {stockIsSold.current ? (
        <>
          <div><b>Sell Date:</b> {DtoS(purchase.sellDate)}</div>
          <div><b>Sell Price:</b> {purchase.sellPrice ? USDollar.format(purchase.sellPrice) : '---'}</div>
        </>
      ) : (
        <>
          <div><b>Current Price:</b> {stockQuote.current ? USDollar.format(stockQuote.current.price) : '---'}</div>
        </>
      )}
      <br />
      <Button disabled={stockIsSold.current} // disable the 'Sell' button if it is already sold
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
      <Accordion.Item eventKey={`${idx}`}>
        <Accordion.Header>
        <span>
          <div><b>Symbol:</b> {purchase.stock.symbol}</div>
          <div><b>Name:</b> {purchase.stock.name}</div>
        </span>
        {/* <span><b>{purchase.stock.symbol}</b> - {purchase.stock.name}</span> */}
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
