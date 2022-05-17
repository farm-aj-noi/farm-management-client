import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Improt_quarters from "../../../../components/BeefWarehouse/BeefStore/03Import/02import_quarters";
import { BackgroundStore } from "../../../../utils/background";
const import_quarters = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Improt_quarters />
    </BackgroundStore>
  );
};

export default import_quarters;
