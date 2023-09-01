import { useState, useEffect } from "react";
import PurchaseListItem from "../../components/PurchaseListItem/PurchaseListItem"
import { Accordion } from "react-bootstrap";

export default function PortfolioPage({portfolio}) {
  var purchaseList = null;
  if (portfolio) {
    purchaseList = portfolio.purchases.map((purchase, idx) => {
      return (
        <PurchaseListItem
          purchase={purchase}
          idx={idx}
          key={idx}
        />
      )
    });
  } else {
    purchaseList = (<h3>No Purchases Yet</h3>)
  }

  return (
    <>
      <Accordion alwaysOpen>
        { purchaseList }
      </Accordion>
    </>
  );
}
