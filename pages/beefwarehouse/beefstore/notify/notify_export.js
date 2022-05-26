import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_export from "../../../../components/BeefWarehouse/BeefStore/07Notify/05notify_export";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const notify_export = () => {
  return (
    <BackgroundStore>
      <Nav/>
      <Notify_export />
      <Footer />
    </BackgroundStore>
  );
};

export default notify_export;
