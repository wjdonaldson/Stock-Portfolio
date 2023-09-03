import { Button, Modal, Table, Row, Col } from "react-bootstrap";

export default function StockQuoteModal({modalShow, setModalShow, stockQuote}) {
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      backdrop="static"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {stockQuote.symbol} - {stockQuote.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover>
          <tbody>
            <tr><th>Price</th><td>{stockQuote.price}</td></tr>
            <tr><th>Symbol</th><td>{stockQuote.symbol}</td></tr>
            <tr><th>Open</th><td>{stockQuote.open}</td></tr>
            <tr><th>High</th><td>{stockQuote.high}</td></tr>
            <tr><th>Low</th><td>{stockQuote.low}</td></tr>
            <tr><th>Volume</th><td>{stockQuote.volume}</td></tr>
            <tr><th>Latest Trading Day</th><td>{stockQuote.latestTradingDay}</td></tr>
            <tr><th>Previous Close</th><td>{stockQuote.previousClose}</td></tr>
            <tr><th>Change</th><td>{stockQuote.change}</td></tr>
            <tr><th>Change Percent</th><td>{stockQuote.changePercent}</td></tr>
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Row className="align-items-center">
          <Col xs="auto" className="my-1">
            <Button onClick={() => setModalShow(false)}>
              Close
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}
