import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Notify_exportrequest from "../../../../components/BeefWarehouse/BeefProduct/06Notify/02notify_exportrequest";
const notify_exportrequest = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Notify_exportrequest />
      <Footer/>
    </BackgroundProduct>
  );
};

export default notify_exportrequest;
