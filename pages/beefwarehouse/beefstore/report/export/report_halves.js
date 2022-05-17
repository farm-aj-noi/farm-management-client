import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_halves from "../../../../../components/BeefWarehouse/BeefStore/06Report/03report_export/01export_halves";
import { BackgroundStore } from "../../../../../utils/background";
function report_halves() {
  return (
    <BackgroundStore>
      <Nav />
      <Report_halves />
    </BackgroundStore>
  );
}

export default report_halves;
