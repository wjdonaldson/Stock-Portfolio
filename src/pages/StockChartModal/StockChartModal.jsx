import { VictoryChart, VictoryAxis, VictoryCandlestick, VictoryTooltip} from 'victory';
import { Button, Modal, Row, Col } from "react-bootstrap";

export default function StockQuoteModal({chartTitle, chartData, modalShow, setModalShow}) {
  
  return (
    <Modal
      show={modalShow}
      onHide={() => setModalShow(false)}
      fullscreen={true}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" className="ms-auto">
          {chartTitle}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <VictoryChart domainPadding={20}>
          <VictoryAxis
            tickCount={10}
            tickFormat={(t) => new Date(t).toLocaleDateString('en-us', { month:"numeric", day:"numeric"}) } 
            style={{ tickLabels: { angle: 90, textAnchor:'start' }, grid: { stroke: '#F4F5F7', strokeWidth: 2 } }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(t) => `$${t}`} 
            style={{ grid: { stroke: '#F4F5F7', strokeWidth: 2 } }}
          />
          <VictoryCandlestick
            data={chartData}
            labelComponent={<VictoryTooltip style={{ fontSize: 6 }}/>}
            labels={({ datum }) => `Date: ${datum.x}
                                    Open: ${datum.open}
                                    High: ${datum.high}
                                    Low: ${datum.low}
                                    Close: ${datum.close}`
            }
            candleColors={{ positive: "green", negative: "red" }}
            />

        </VictoryChart>
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
