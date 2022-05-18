import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_storeentail from "../../../../../components/BeefWarehouse/BeefStore/06Report/04report_store/storeentrail";
import { BackgroundStore } from "../../../../../utils/background";
const report_storeentrail = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_storeentail />
    </BackgroundStore>
  );
};

export default report_storeentrail;
