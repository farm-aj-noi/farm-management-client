import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Export_lumps from "../../../../components/BeefWarehouse/BeefStore/04Export/03export_lump";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const export_lumps = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export_lumps />
      <Footer />
    </BackgroundStore>
  );
};

export default export_lumps;
