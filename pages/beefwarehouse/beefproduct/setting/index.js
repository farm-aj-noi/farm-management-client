import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Settingtype from "../../../../components/BeefWarehouse/BeefProduct/07Setting/type";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Settingtype />
      <Footer />
    </BackgroundStore>
  );
};

export default index;
