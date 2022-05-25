import React from "react";
import RequestExport from "../../../components/BeefWarehouse/BeefStore/11Requestexport";
import { BackgroundStore } from "../../../utils/background";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";

const requestexport = () => {
  return (
    <BackgroundStore>
      <Nav />
      <RequestExport />
    </BackgroundStore>
  );
};

export default requestexport;
