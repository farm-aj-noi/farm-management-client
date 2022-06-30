import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Report_export from "../../../../components/BeefWarehouse/BeefProduct/05Report/02report_export"
function report_export() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_export />
      <Footer />
    </BackgroundStore>
  );
}

export default report_export;
