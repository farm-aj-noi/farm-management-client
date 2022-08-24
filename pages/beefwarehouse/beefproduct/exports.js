import React from "react";
import Nav from "../../../components/BeefWarehouse/BeefProduct/Nav/Nav";
import Export from "../../../components/BeefWarehouse/BeefProduct/03Export";
import { BackgroundProduct } from "../../../utils/background";
import Footer from "../../../components/BeefWarehouse/Footer";
const exports = () => {
  return (
    <BackgroundProduct>
      <Nav />
      <Export />
      <Footer />
    </BackgroundProduct>
  );
};

export default exports;
