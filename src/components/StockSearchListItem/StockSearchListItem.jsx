import { Button, Card } from "react-bootstrap";

export default function StockSearchListItem({ stock, activeStock, setActiveStock}) {
  return (
    // <Card style={{ width: '25vw' }}>
    <Card>
      <Card.Body>
        <Card.Title>Symbol: {stock.symbol}</Card.Title>
        <Card.Text><b>Name:</b> {stock.name}</Card.Text>
          {/* <div><b>Type:</b> {stock.type}</div>
          <div><b>Region:</b> {stock.region}</div>
          <p>marketOpen: {stock.marketOpen}</p>
          <p>marketClose: {stock.marketClose}</p>
          <p>timezone: {stock.timezone}</p>
          <p>currency: {stock.currency}</p>
          <p>matchScore: {stock.matchScore}</p> */}
        <Button 
          size="sm"
          variant="primary"
          onClick={() => setActiveStock(stock)}
        >
          Select
        </Button>
      </Card.Body>
    </Card>
  );
}
