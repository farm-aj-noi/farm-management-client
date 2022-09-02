import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingroom from "../../../../components/BeefWarehouse/BeefProduct/07Setting/room";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";

const room = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Settingroom />
      <Footer />
    </BackgroundProduct>
  );
};

export default room;
