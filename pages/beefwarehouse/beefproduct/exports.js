import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Export from "../../../components/BeefWarehouse/BeefProduct/03Export";
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const exports = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Export />
      <Footer />
    </BackgroundStore>
  );
};

export default exports;
