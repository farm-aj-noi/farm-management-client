import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Export_entrails from "../../../../components/BeefWarehouse/BeefStore/04Export/05export_entrails";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const export_entrails = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export_entrails />
      <Footer />
    </BackgroundStore>
  );
};

export default export_entrails;
