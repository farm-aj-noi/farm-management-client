import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Import_chops from "../../../../components/BeefWarehouse/BeefStore/03Import/04import_chops";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const import_chops = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import_chops />
      <Footer />
    </BackgroundStore>
  );
};

export default import_chops;
