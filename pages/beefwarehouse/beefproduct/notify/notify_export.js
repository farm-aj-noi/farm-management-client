import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Notify_export from "../../../../components/BeefWarehouse/BeefProduct/06Notify/04notify_export";
const notify_export = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_export />
      <Footer/>
    </BackgroundStore>
  );
};

export default notify_export;
