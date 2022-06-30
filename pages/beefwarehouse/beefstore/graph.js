import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Graph from "../../../components/BeefWarehouse/BeefStore/10graph";
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const graph = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Graph />
      <Footer />
    </BackgroundStore>
  );
};

export default graph;
