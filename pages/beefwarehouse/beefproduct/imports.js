import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Import from "../../../components/BeefWarehouse/BeefProduct/02Import";
import { BackgroundProduct } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const imports = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Import />
      <Footer />
    </BackgroundProduct>
  );
};

export default imports;
