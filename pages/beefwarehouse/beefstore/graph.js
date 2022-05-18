import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefStore/Nav/Nav";
import Graph from "../../../components/BeefWarehouse/BeefStore/10graph";
import { BackgroundStore } from "../../../utils/background";
const graph = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Graph />
    </BackgroundStore>
  );
};

export default graph;
