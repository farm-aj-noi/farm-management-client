import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingroom from "../../../../components/BeefWarehouse/BeefProduct/07Setting/room";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";

const room = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Settingroom />
      <Footer />
    </BackgroundStore>
  );
};

export default room;
