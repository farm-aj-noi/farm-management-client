import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Store_entrail from "../../../../components/BeefWarehouse/BeefStore/05Store/02Storeentrail";
import { BackgroundStore } from "../../../../utils/background";
const storeentrail = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Store_entrail />
    </BackgroundStore>
  );
};

export default storeentrail;
