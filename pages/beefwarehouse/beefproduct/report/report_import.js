import React from "react";
import Nav from "../../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import { BackgroundStore } from "../../../../utils/background";
import Footer from "../../../../components/BeefWarehouse/Footer";
import Report_import from "../../../../components/BeefWarehouse/BeefProduct/05Report/01report_import";
function report_import() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_import />
      <Footer />
    </BackgroundStore>
  );
}

export default report_import;
