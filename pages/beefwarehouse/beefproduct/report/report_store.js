import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundProduct } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Report_store from "../../../../components/BeefWarehouse/BeefProduct/05Report/03report_store";
function report_store() {
  return (
    <BackgroundProduct>
      <Nav />
      <Report_store />
      <Footer />
    </BackgroundProduct>
  );
}

export default report_store;
