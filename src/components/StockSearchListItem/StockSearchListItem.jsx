import { Button, Card } from "react-bootstrap";

export default function StockSearchListItem({ stock, activeStock, setActiveStock}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        {/* <Card.Title>Card Title</Card.Title> */}
        <Card.Text>
          <p>Symbol: {stock.symbol}</p>
          <p>name: {stock.name}</p>
          <p>type: {stock.type}</p>
          <p>region: {stock.region}</p>
          <p>marketOpen: {stock.marketOpen}</p>
          <p>marketClose: {stock.marketClose}</p>
          <p>timezone: {stock.timezone}</p>
          <p>currency: {stock.currency}</p>
          <p>matchScore: {stock.matchScore}</p>
        </Card.Text>
        <Button variant="primary">Select</Button>
      </Card.Body>
    </Card>
  );
}
