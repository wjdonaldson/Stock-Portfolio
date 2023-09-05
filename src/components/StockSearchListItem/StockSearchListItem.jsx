import { Accordion, Button, Card } from "react-bootstrap";

export default function StockSearchListItem({ stock, handleNewStockInterest, idx}) {
  return (
    <Accordion.Item eventKey={`${idx}`}>
      <Accordion.Header>
        <span>
          <div><b>Symbol:</b> {stock.symbol}</div>
          <div><b>Name:</b> {stock.name}</div>
        </span>
      </Accordion.Header>
      <Accordion.Body>
          <div><b>Type:</b> {stock.type}</div>
          <div><b>Region:</b> {stock.region}</div>
          <div><b>marketOpen:</b> {stock.marketOpen}</div>
          <div><b>marketClose:</b> {stock.marketClose}</div>
          <div><b>timezone:</b> {stock.timezone}</div>
          <div><b>currency:</b> {stock.currency}</div>
          <Button 
            size="sm"
            variant="primary"
            onClick={() => handleNewStockInterest(stock)}
          >
            Select
          </Button>
      </Accordion.Body>
    </Accordion.Item>
  )
}
