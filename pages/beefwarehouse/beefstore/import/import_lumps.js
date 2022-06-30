import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Import_lumps from "../../../../components/BeefWarehouse/BeefStore/03Import/03import_lumps";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const import_lumps = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import_lumps />
      <Footer />
    </BackgroundStore>
  );
};

export default import_lumps;
