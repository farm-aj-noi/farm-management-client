import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_halves from "../../../../../components/BeefWarehouse/BeefStore/06Report/02report_import/01import_halves";
import { BackgroundStore } from "../../../../../utils/background";
const report_halves = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_halves />
    </BackgroundStore>
  );
};

export default report_halves;
