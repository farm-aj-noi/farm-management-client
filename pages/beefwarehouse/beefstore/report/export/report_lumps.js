import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_lumps from "../../../../../components/BeefWarehouse/BeefStore/06Report/03report_export/03export_lumps";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
const report_lumps = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_lumps />
      <Footer />
    </BackgroundStore>
  );
};

export default report_lumps;
