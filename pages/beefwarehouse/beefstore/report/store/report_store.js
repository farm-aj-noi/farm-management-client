import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_store from "../../../../../components/BeefWarehouse/BeefStore/06Report/04report_store/store";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
function report_store() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_store />
      <Footer />
    </BackgroundStore>
  );
}

export default report_store;
