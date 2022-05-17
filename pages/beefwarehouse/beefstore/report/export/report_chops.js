import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_chops from "../../../../../components/BeefWarehouse/BeefStore/06Report/03report_export/04export_chops";
import { BackgroundStore } from "../../../../../utils/background";
const report_chops = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_chops />
    </BackgroundStore>
  );
};

export default report_chops;
