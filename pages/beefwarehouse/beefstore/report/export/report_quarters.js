import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_quarters from "../../../../../components/BeefWarehouse/BeefStore/06Report/03report_export/02export_quarters";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
const report_quarters = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_quarters />
      <Footer />
    </BackgroundStore>
  );
};

export default report_quarters;
