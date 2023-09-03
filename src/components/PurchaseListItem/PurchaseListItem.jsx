import { Accordion, Button } from "react-bootstrap";
import { useRef, useState, useEffect } from "react"
import * as stocksService from "../../utilities/stocks-service"

export default function PurchaseListItem({ purchase, idx, handleStockSell }) {
  const [isLoading, setIsLoading] = useState(false);
  const stockQuote = useRef(null);
  const stockIsSold = useRef(false);

  useEffect(function () {
    console.log(purchase);
    if (purchase.sellPrice > 0) {
      console.log('Stock IS sold!')
      console.log(purchase.sellPrice);
      stockIsSold.current = true;
    } else {
      console.log('Stock IS NOT sold?')
      console.log(purchase.sellPrice);
    }
  }, []);

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
        console.log('Got Quote:');
        console.log(quote);
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
          <div><b>Current Price:</b> {stockQuote.current ? USDollar.format(stockQuote.current.price) : 'Loading!'}</div>
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
          <b>{purchase.stock.symbol}</b> - {purchase.stock.name}
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
