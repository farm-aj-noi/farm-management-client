import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Import_entrails from "../../../../components/BeefWarehouse/BeefStore/03Import/05import_entrails";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const import_entrails = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import_entrails />
      <Footer />
    </BackgroundStore>
  );
};

export default import_entrails;
