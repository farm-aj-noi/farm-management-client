import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Import_halve from "../../../../components/BeefWarehouse/BeefStore/03Import/01import_halves";
import { BackgroundStore } from "../../../../utils/background";
const import_halve = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import_halve />
    </BackgroundStore>
  );
};

export default import_halve;
