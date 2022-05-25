import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Dashboard from "../../../components/BeefWarehouse/BeefStore/01Dashboard";
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const index = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Dashboard />
      <Footer />
    </BackgroundStore>
  );
};

export default index;
