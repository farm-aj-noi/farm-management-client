import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingtype from "../../../../components/BeefWarehouse/BeefProduct/07Setting/type";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Settingtype />
      <Footer />
    </BackgroundProduct>
  );
};

export default index;
