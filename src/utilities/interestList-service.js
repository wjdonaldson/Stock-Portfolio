import * as interestListAPI from './interestList-api';

export async function getInterestList() {
  const interestList = await interestListAPI.getInterestList();
  console.log('interestListAPI.getInterestList() got:');
  console.log(interestList);
  console.log(interestList.user);
  console.log(interestList.stocks);
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
