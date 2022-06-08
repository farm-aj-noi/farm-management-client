import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Import from "../../../components/BeefWarehouse/BeefProduct/02Import";
import { BackgroundStore } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const imports = () => {
  return (
    <BackgroundStore>
      <Nav />
      <Import />
      <Footer />
    </BackgroundStore>
  );
};

export default imports;
