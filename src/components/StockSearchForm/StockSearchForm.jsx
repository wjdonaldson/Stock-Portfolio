import { useState } from "react";
import * as stocksService from "../../utilities/stocks-service"
import { Button, Form } from "react-bootstrap";

export default function StockSearchForm({ setSearchStocks, setIsLoading }) {
  const [searchTerm, setSearchTerm] = useState(null);
  const [error, setError] = useState("");

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
    setError("");
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    setError("");
    setIsLoading(true);
    stocksService.search(searchTerm)
    .then(searchStockList => {
      if (!searchStockList) {
        setError("API use limit reached");
      } else {
        if (searchStockList.length === 0) {
          setError("No Results Found");
        }
      }
      setSearchStocks(searchStockList);
      setIsLoading(false);
    })
    .catch(err => {
      setSearchStocks(null);
      setIsLoading(false);
      console.error(err);
      setError("Search Failed - Try Again");
    });
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
        <Button variant="primary" type="submit" size="sm">
          Search
        </Button>
      </Form>
      <p className="error-message">&nbsp;{error}</p>
    </>
  );
}
