import sendRequest from "./send-request";
const BASE_URL = "https://www.alphavantage.co/query?";

export function getStock(symbol) {
  return sendRequest(`${BASE_URL}function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.API_KEY}`)
}

export function search(searchTerm) {
  return sendRequest(`${BASE_URL}function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=${process.env.API_KEY}`)
}
