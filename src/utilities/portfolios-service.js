import * as portfolioAPI from './portfolios-api';

export async function getPortfolio() {
  try {
    return await portfolioAPI.getPortfolio();
  } catch (err) {
    console.error(err);
  }
}

export async function createPortfolio() {
  return await portfolioAPI.createPortfolio();
}

export async function addPurchase(puchase) {
  return await portfolioAPI.addPuchase(puchase);
}

export async function updatePurchase(puchase) {
  return await portfolioAPI.updatePurchase(puchase);
}
