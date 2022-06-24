import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Notify_exportrequest from "../../../../components/BeefWarehouse/BeefProduct/06Notify/02notify_exportrequest";
const notify_exportrequest = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_exportrequest />
      <Footer/>
    </BackgroundStore>
  );
};

export default notify_exportrequest;
