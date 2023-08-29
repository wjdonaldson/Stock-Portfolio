import { Button, Card } from "react-bootstrap";

export default function StockListItem({ stock, activeStock, setActiveStock}) {
  return (
    <>
      <Card style={{ width: '25vw' }}>
        <Card.Body>
          <Card.Title>Symbol: {stock.symbol}</Card.Title>
          <Card.Text><b>Name:</b> {stock.name}</Card.Text>
          <p>Price: ${Number(stock.price).toFixed(2)}</p>
          {/* <p>Symbol: {stock.symbol}</p>
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
            variant="primary"
            onClick={() => setActiveStock(stock)}
          >
            Buy
          </Button>
        </Card.Body>
      </Card>
    </>
  );
}
