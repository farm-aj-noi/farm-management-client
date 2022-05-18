import React from "react";
import Nav from "../../../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Report_lumps from "../../../../../components/BeefWarehouse/BeefStore/06Report/02report_import/03import_lumps";
import { BackgroundStore } from "../../../../../utils/background";
const report_lumps = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Report_lumps />
    </BackgroundStore>
  );
};

export default report_lumps;
