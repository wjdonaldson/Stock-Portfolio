import sendRequest from "./send-request";
const BASE_URL = "/api/portfolios";

export function getPortfolio() {
  try {
    return sendRequest(BASE_URL, "GET");
  }catch (err) {
    console.error(err);
  }
}

export function createPortfolio() {
  return sendRequest(`${BASE_URL}`, "POST");
}

export function addPuchase(purchase) {
  return sendRequest(`${BASE_URL}/purchase`, "POST", purchase)
}

export function updatePurchase(purchase) {
  return sendRequest(`${BASE_URL}/purchase/${purchase._id}`, "PUT", purchase)
}