import { useState, useEffect } from "react";
import * as stocksService from "../../utilities/stocks-service"
import { Button, Form } from "react-bootstrap";

export default function StockSearchForm({setSearchStocks}) {
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const searchStockList = await stocksService.search(searchTerm);
      console.log(searchStockList);
      setSearchStocks(searchStockList);
    } catch(e) {
      console.log(e);
      setError("Search Failed - Try Again");
    }
  }

  return (
    <>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="searchFor">
          <Form.Control
            type="test"
            name="searchFor"
            placeholder="Enter search term"
            onChange={handleChange}
            autoComplete="off"
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
