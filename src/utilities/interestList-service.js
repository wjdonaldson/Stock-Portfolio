import * as interestListAPI from './interestList-api';

export async function getInterestList() {
  const interestList = await interestListAPI.getInterestList();
  if (interestList) {
    return interestList;
  }
}

export async function createInterestList() {
  return JSON.parse(await interestListAPI.createInterestList());
}

export async function addStock(stock) {
  await interestListAPI.addStock(stock);
}

export async function delStock(stock) {
  await interestListAPI.delStock(stock);
}
