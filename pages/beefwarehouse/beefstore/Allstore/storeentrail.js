import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Store_entrail from "../../../../components/BeefWarehouse/BeefStore/05Store/02Storeentrail";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const storeentrail = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Store_entrail />
      <Footer />
    </BackgroundStore>
  );
};

export default storeentrail;
