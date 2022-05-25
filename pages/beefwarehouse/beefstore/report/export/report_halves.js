import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_halves from "../../../../../components/BeefWarehouse/BeefStore/06Report/03report_export/01export_halves";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
function report_halves() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_halves />
      <Footer />
    </BackgroundStore>
  );
}

export default report_halves;
