import sendRequest from "./send-request";
const BASE_API_URL = "https://www.alphavantage.co/query?";
const BASE_URL = "/api/stocks";

export function getStockQuote(symbol) {
  return sendRequest(`${BASE_API_URL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`)
}

export function search(searchTerm) {
  return sendRequest(`${BASE_API_URL}function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${process.env.API_KEY}`)
}

export function create(stock) {
  return sendRequest(BASE_URL, "POST", stock);
}

export function getStock(symbol) {
  return sendRequest(`${BASE_URL}/${symbol}`, "GET");
}

export function getStockTimeSeriesDaily(symbol) {
  return sendRequest(`${BASE_API_URL}function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${process.env.API_KEY}`)
}
