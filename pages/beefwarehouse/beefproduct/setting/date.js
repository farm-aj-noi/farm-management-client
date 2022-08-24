import React from "react";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingexdate from "../../../../components/BeefWarehouse/BeefProduct/07Setting/exdate";
const date = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Settingexdate />
      <Footer />
    </BackgroundProduct>
  );
};

export default date;
