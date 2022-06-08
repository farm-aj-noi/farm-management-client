import React from "react";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Settingfreezer from "../../../../components/BeefWarehouse/BeefProduct/07Setting/freezer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
const freezer = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Settingfreezer />
      <Footer />
    </BackgroundStore>
  );
};

export default freezer;
