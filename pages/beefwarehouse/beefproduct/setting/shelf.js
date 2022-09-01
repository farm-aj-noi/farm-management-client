import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingshelf from "../../../../components/BeefWarehouse/BeefProduct/07Setting/shelf";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";

const shelf = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Settingshelf />
      <Footer />
    </BackgroundProduct>
  );
};

export default shelf;
