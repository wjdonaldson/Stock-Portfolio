import * as stocksAPI from './stocks-api';

export async function getStock(symbol) {
  const stockQuote = await stocksAPI.getStock(symbol);
  const stock = {
        symbol: stockQuote["Global Quote"]["01. symbol"],
        open: stockQuote["Global Quote"]["02. open"],
        high: stockQuote["Global Quote"]["03. high"],
        low: stockQuote["Global Quote"]["04. low"],
        price: stockQuote["Global Quote"]["05. price"],
        volume: stockQuote["Global Quote"]["06. volume"],
        latestTradingDay: stockQuote["Global Quote"]["07. latest trading day"],
        previousClose: stockQuote["Global Quote"]["08. previous close"],
        change: stockQuote["Global Quote"]["09. change"],
        changePercent: stockQuote["Global Quote"]["10. change percent"]
  }
  return stock;
}
