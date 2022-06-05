import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Import_halve from "../../../../components/BeefWarehouse/BeefStore/03Import/01import_halves";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const import_halve = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import_halve />
      <Footer />
    </BackgroundStore>
  );
};

export default import_halve;
