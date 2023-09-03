import * as interestListAPI from './interestList-api';

export async function getInterestList() {
  return await interestListAPI.getInterestList();
}

export async function createInterestList() {
  return await interestListAPI.createInterestList();
}

export async function addStock(stock) {
  return await interestListAPI.addStock(stock);
}

export async function delStock(stock) {
  return await interestListAPI.delStock(stock);
}
