import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Export_quarters from "../../../../components/BeefWarehouse/BeefStore/04Export/02export_quarters";
import { BackgroundStore } from "../../../../utils/background";
const export_quarters = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export_quarters />
    </BackgroundStore>
  );
};

export default export_quarters;
