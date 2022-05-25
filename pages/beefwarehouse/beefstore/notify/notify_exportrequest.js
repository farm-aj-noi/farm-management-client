import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Notify_exportrequest from "../../../../components/BeefWarehouse/BeefStore/07Notify/02notify_exportrequest";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
const notify_exportrequest = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Notify_exportrequest />
      <Footer />
    </BackgroundStore>
  );
};

export default notify_exportrequest;
