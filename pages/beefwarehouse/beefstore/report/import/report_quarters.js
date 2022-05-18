import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_quarters from "../../../../../components/BeefWarehouse/BeefStore/06Report/02report_import/02import_quarters";
import { BackgroundStore } from "../../../../../utils/background";
const report_quarters = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_quarters />
    </BackgroundStore>
  );
};

export default report_quarters;
