import React from "react";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Settingfreezer from "../../../../components/BeefWarehouse/BeefProduct/07Setting/freezer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
const freezer = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Settingfreezer />
      <Footer />
    </BackgroundProduct>
  );
};

export default freezer;
