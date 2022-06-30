import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_entrails from "../../../../../components/BeefWarehouse/BeefStore/06Report/02report_import/05import_entrails";
import { BackgroundStore } from "../../../../../utils/background";
import Footer from "../../../../../components/BeefWarehouse/Footer";
const report_entrails = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_entrails />
      <Footer />
    </BackgroundStore>
  );
};

export default report_entrails;
