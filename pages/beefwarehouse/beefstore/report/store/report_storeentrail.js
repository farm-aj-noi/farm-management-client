import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_storeentail from "../../../../../components/BeefWarehouse/BeefStore/06Report/04report_store/storeentrail";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
const report_storeentrail = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_storeentail />
      <Footer />
    </BackgroundStore>
  );
};

export default report_storeentrail;
