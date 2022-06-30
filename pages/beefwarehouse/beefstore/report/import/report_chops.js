import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_chops from "../../../../../components/BeefWarehouse/BeefStore/06Report/02report_import/04import_chops";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
const report_chops = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_chops />
      <Footer />
    </BackgroundStore>
  );
};

export default report_chops;
