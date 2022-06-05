import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_chill from "../../../../components/BeefWarehouse/BeefStore/06Report/01report_chill";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
function report_chill() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_chill />
      <Footer />
    </BackgroundStore>
  );
}

export default report_chill;
