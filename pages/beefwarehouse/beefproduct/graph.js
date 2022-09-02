import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Grap from "../../../components/BeefWarehouse/BeefProduct/08Graph";
import { BackgroundProduct } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";

const graph = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Grap />
      <Footer />
    </BackgroundProduct>
  );
};

export default graph;
