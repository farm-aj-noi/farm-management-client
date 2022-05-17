import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Export_chops from "../../../../components/BeefWarehouse/BeefStore/04Export/04export_chops";
import { BackgroundStore } from "../../../../utils/background";
const export_chops = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export_chops />
    </BackgroundStore>
  );
};

export default export_chops;
