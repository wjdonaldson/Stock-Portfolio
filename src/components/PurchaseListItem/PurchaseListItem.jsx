import { Accordion, Button, Card } from "react-bootstrap";

export default function PurchaseListItem({ purchase, idx }) {
  return (
    <>
      <Accordion.Item eventKey={`${idx}`}>
        <Accordion.Header>{purchase.stock.symbol} - {purchase.stock.name}</Accordion.Header>
        <Accordion.Body>
          <div><b>Purchase Price:</b> ${Number(purchase.buyPrice).toFixed(2)}</div>
          <Button 
            className="mx-1"
            variant="secondary"
            size="sm"
          >
            Sell
          </Button>

        </Accordion.Body>
      </Accordion.Item>
      {/* <Card>
        <Card.Body>
          <Card.Title>Symbol: {purchase.stock.symbol}</Card.Title>
          <Card.Text>
            <div><b>Name:</b> {purchase.stock.name}</div>
            <div><b>Purchase Price:</b> ${Number(purchase.buyPrice).toFixed(2)}</div>
          </Card.Text>
        </Card.Body>
      </Card> */}
    </>
  );
}
