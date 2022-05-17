import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Dashboard from "../../../components/BeefWarehouse/BeefStore/01Dashboard";
import { BackgroundStore } from "../../../utils/background";
const index = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Dashboard />
    </BackgroundStore>
  );
};

export default index;
