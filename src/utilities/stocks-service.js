import * as stocksAPI from './stocks-api';

export async function getStockQuote(symbol) {
  const stockQuote = await stocksAPI.getStockQuote(symbol);
  if (stockQuote.Note) {
    return null;
  }
  if (stockQuote.Information) {
    return null;
  }
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

export async function search(searchTerm) {
  const searchResults = await stocksAPI.search(searchTerm);
  if (searchResults.Note) {
    return null;
  }
  if (searchResults.Information) {
    return null;
  }
  var retVal = searchResults.bestMatches.map(resultStock => {
    return {
        symbol: resultStock["1. symbol"],
        name: resultStock["2. name"],
        type: resultStock["3. type"],
        region: resultStock["4. region"],
        marketOpen: resultStock["5. marketOpen"],
        marketClose: resultStock["6. marketClose"],
        timezone: resultStock["7. timezone"],
        currency: resultStock["8. currency"],
        matchScore: resultStock["9. matchScore"],
     }
  });
  // Only show results that are in US dollars
  // return retVal.filter((stock) => stock.currency === 'USD');
  return retVal;
}

export async function getStock(symbol) {
  return await stocksAPI.getStock(symbol);
}

export async function create(stock) {
  return await stocksAPI.create(stock);
}

export async function getStockTimeSeriesDaily(symbol) {
  const results = await stocksAPI.getStockTimeSeriesDaily(symbol);
  if (results.Note) {
    return null;
  }
  if (results.Information) {
    return null;
  }
  var resultData = [];
  for (const [key, value] of Object.entries(results["Time Series (Daily)"])) {
    var resultDay = {
      x: key,
      open: value["1. open"],
      high: value["2. high"],
      low: value["3. low"],
      close: value["4. close"]
    };
    resultData.push(resultDay);
  }
  // just return the last 30 days and reverse the order so they are newest last
  return resultData.slice(0, 30).reverse();
}
