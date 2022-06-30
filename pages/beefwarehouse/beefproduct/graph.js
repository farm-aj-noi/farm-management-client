import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Grap from "../../../components/BeefWarehouse/BeefProduct/08Graph";
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";

const graph = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Grap />
      <Footer />
    </BackgroundStore>
  );
};

export default graph;
