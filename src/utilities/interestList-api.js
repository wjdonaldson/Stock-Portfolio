import sendRequest from "./send-request";
const BASE_URL = "/api/interest-list";

export function getInterestList() {
  return sendRequest(BASE_URL, "GET");
}

export function createInterestList() {
  return sendRequest(`${BASE_URL}`, "POST");
}

export function addStock(stock) {
  return sendRequest(`${BASE_URL}/add-stock`, "POST", stock)
}

export function delStock(stock) {
  return sendRequest(`${BASE_URL}/del-stock`, "POST", stock)
}