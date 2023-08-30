import { Button, Card } from "react-bootstrap";

export default function StockListItem({ stock, activeStock, setActiveStock, handleDeleteStockInterest }) {
  return (
    <>
      {/* <Card style={{ width: '25vw' }}> */}
      <Card>
        <Card.Body>
          <Card.Title>Symbol: {stock.symbol}</Card.Title>
          <Card.Text><b>Name:</b> {stock.name}</Card.Text>
          {/* <p>Price: ${Number(stock.price).toFixed(2)}</p>
          <p>Symbol: {stock.symbol}</p>
          <p>Open: {stock.open}</p>
          <p>High: {stock.high}</p>
          <p>Low: {stock.low}</p>
          <p>Price: {stock.price}</p>
          <p>Volume: {stock.volume}</p>
          <p>Latest Trading Day: {stock.latestTradingDay}</p>
          <p>Previous Close: {stock.previousClose}</p>
          <p>Change: {stock.change}</p>
          <p>Change Percent: {stock.changePercent}</p> */}
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
            onClick={() => setActiveStock(stock)}
          >
            Quote
          </Button>
          <Button 
            className="mx-1"
            variant="primary"
            size="sm"
            onClick={() => setActiveStock(stock)}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
